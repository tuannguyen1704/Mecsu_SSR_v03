"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { MockAuthUser, RegisterAccountPayload } from "../types/auth";
import LoginForm from "./LoginForm";
import RegisterAccountStep from "./RegisterAccountStep";
import RegisterAddressStep from "./RegisterAddressStep";

type AuthModalMode = "login" | "register";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: MockAuthUser) => void;
}

const emptyRegisterAccount: RegisterAccountPayload = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<AuthModalMode>("login");
  const [registerStep, setRegisterStep] = useState<1 | 2>(1);
  const [registerAccount, setRegisterAccount] =
    useState<RegisterAccountPayload>(emptyRegisterAccount);
  const portalRoot = typeof document === "undefined" ? null : document.body;

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) return;

    const timeoutId = window.setTimeout(() => {
      setMode("login");
      setRegisterStep(1);
      setRegisterAccount(emptyRegisterAccount);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [isOpen]);

  if (!portalRoot) {
    return null;
  }

  const isRegister = mode === "register";
  const modalWidth =
    isRegister && registerStep === 2
      ? "max-w-[min(520px,calc(100vw-32px))]"
      : isRegister
        ? "max-w-[500px]"
        : "max-w-[460px]";
  const modalOverflow = isRegister && registerStep === 2 ? "overflow-hidden" : "overflow-y-auto";

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[99999]"
        >
          <div
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-slate-950/15" aria-hidden="true" />
          <div className="pointer-events-none relative z-10 flex min-h-dvh items-center justify-center overflow-y-auto p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(event) => event.stopPropagation()}
              className={`pointer-events-auto relative z-10 max-h-[calc(100dvh-32px)] w-full rounded-3xl bg-white shadow-2xl ${modalOverflow} ${modalWidth}`}
              role="dialog"
              aria-modal="true"
              aria-labelledby="auth-modal-title"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 rounded-full p-2 transition-colors hover:bg-slate-100"
                aria-label="Đóng modal"
              >
                <X size={20} className="text-slate-400" />
              </button>

              {mode === "login" ? (
                <LoginForm
                  onSuccess={(user) => {
                    onSuccess(user);
                    onClose();
                  }}
                  onRegisterClick={() => {
                    setMode("register");
                    setRegisterStep(1);
                  }}
                />
              ) : registerStep === 1 ? (
                <RegisterAccountStep
                  initialValue={registerAccount}
                  onBackToLogin={() => setMode("login")}
                  onContinue={(payload) => {
                    setRegisterAccount(payload);
                    setRegisterStep(2);
                  }}
                />
              ) : (
                <RegisterAddressStep
                  account={registerAccount}
                  onBack={() => setRegisterStep(1)}
                  onSuccess={(user) => {
                    onSuccess(user);
                    onClose();
                  }}
                />
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    portalRoot,
  );
}
