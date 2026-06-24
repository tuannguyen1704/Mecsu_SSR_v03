"use client";

import { useEffect } from "react";

const MODAL_SELECTOR = '[data-modal-scroll-lock="true"]';

export function clearBodyScrollLock() {
  if (typeof document === "undefined") return;
  if (document.querySelector(MODAL_SELECTOR)) return;

  const html = document.documentElement;
  const body = document.body;
  const shouldRestoreScroll = body.style.position === "fixed";
  const scrollY = shouldRestoreScroll
    ? Math.max(0, Number.parseInt(body.style.top || "0", 10) * -1)
    : 0;

  html.style.overflow = "";
  body.style.overflow = "";
  body.style.position = "";
  body.style.top = "";
  body.style.width = "";
  body.classList.remove("modal-open");

  if (shouldRestoreScroll) {
    window.scrollTo(0, scrollY);
  }
}

export function ModalScrollLock() {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    let scrollY = 0;
    let locked = false;
    let previousHtmlOverflow = "";
    let previousBodyOverflow = "";
    let previousBodyPosition = "";
    let previousBodyTop = "";
    let previousBodyWidth = "";
    let didUseFixedBodyLock = false;
    let lastTouchY = 0;

    const findScrollableParent = (
      target: EventTarget | null,
      modal: Element,
    ) => {
      let element =
        target instanceof Element ? target : null;

      while (element && element !== modal) {
        const style = window.getComputedStyle(element);
        const canScroll =
          /(auto|scroll)/.test(style.overflowY) &&
          element.scrollHeight > element.clientHeight;

        if (canScroll) return element;
        element = element.parentElement;
      }

      return null;
    };

    const preventOutsideScroll = (
      event: WheelEvent | TouchEvent,
      deltaY: number,
    ) => {
      if (!locked) return;

      const target =
        event.target instanceof Element ? event.target : null;
      const modal = target?.closest(MODAL_SELECTOR);

      if (!modal) {
        event.preventDefault();
        return;
      }

      const scrollable = findScrollableParent(target, modal);
      if (!scrollable) {
        event.preventDefault();
        return;
      }

      const atTop = scrollable.scrollTop <= 0;
      const atBottom =
        scrollable.scrollTop + scrollable.clientHeight >=
        scrollable.scrollHeight - 1;

      if ((deltaY < 0 && atTop) || (deltaY > 0 && atBottom)) {
        event.preventDefault();
      }
    };

    const handleWheel = (event: WheelEvent) => {
      preventOutsideScroll(event, event.deltaY);
    };

    const handleTouchStart = (event: TouchEvent) => {
      lastTouchY = event.touches[0]?.clientY ?? 0;
    };

    const handleTouchMove = (event: TouchEvent) => {
      const currentY = event.touches[0]?.clientY ?? lastTouchY;
      const deltaY = lastTouchY - currentY;
      lastTouchY = currentY;
      preventOutsideScroll(event, deltaY);
    };

    const lock = () => {
      if (locked) return;
      locked = true;
      scrollY = window.scrollY;
      previousHtmlOverflow = html.style.overflow;
      previousBodyOverflow = body.style.overflow;
      previousBodyPosition = body.style.position;
      previousBodyTop = body.style.top;
      previousBodyWidth = body.style.width;
      didUseFixedBodyLock = true;

      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      body.style.position = "fixed";
      body.style.top = `-${scrollY}px`;
      body.style.width = "100%";
    };

    const unlock = () => {
      if (!locked) return;
      locked = false;
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      body.style.position = previousBodyPosition;
      body.style.top = previousBodyTop;
      body.style.width = previousBodyWidth;
      body.classList.remove("modal-open");

      if (didUseFixedBodyLock) {
        window.scrollTo(0, scrollY);
      }

      didUseFixedBodyLock = false;
    };

    const syncScrollLock = () => {
      if (document.querySelector(MODAL_SELECTOR)) {
        lock();
      } else {
        unlock();
      }
    };

    const observer = new MutationObserver(syncScrollLock);
    observer.observe(body, {
      attributes: true,
      attributeFilter: ["data-modal-scroll-lock"],
      childList: true,
      subtree: true,
    });
    document.addEventListener("wheel", handleWheel, {
      capture: true,
      passive: false,
    });
    document.addEventListener("touchstart", handleTouchStart, {
      capture: true,
      passive: true,
    });
    document.addEventListener("touchmove", handleTouchMove, {
      capture: true,
      passive: false,
    });
    syncScrollLock();

    return () => {
      observer.disconnect();
      document.removeEventListener("wheel", handleWheel, true);
      document.removeEventListener("touchstart", handleTouchStart, true);
      document.removeEventListener("touchmove", handleTouchMove, true);
      unlock();
    };
  }, []);

  return null;
}
