"use client";

import { useState } from "react";
import { Building2, User as UserIcon } from "lucide-react";
import { InfoSection } from "./InfoSection";
import { PersonalInfoEditModal } from "./PersonalInfoEditModal";
import { BusinessInfoEditModal } from "./BusinessInfoEditModal";
import { AccountSecurityStatusSection } from "./AccountSecurityStatusSection";
import {
  mockUserProfile,
  formatDate,
  formatGender,
  emptyValue,
} from "../data/account-profile";
import type { UserPersonalInfo, UserBusinessInfo } from "../types/account";

export function AccountInfoPageShell() {
  const [profile, setProfile] = useState(mockUserProfile);
  const [isPersonalModalOpen, setIsPersonalModalOpen] = useState(false);
  const [isBusinessModalOpen, setIsBusinessModalOpen] = useState(false);

  const personalInfoItems = [
    { label: "Họ và tên", value: emptyValue(profile.personal.fullName) },
    { label: "Email", value: emptyValue(profile.personal.email) },
    { label: "Số điện thoại", value: emptyValue(profile.personal.phone) },
    {
      label: "Giới tính",
      value: formatGender(profile.personal.gender),
    },
    {
      label: "Ngày sinh",
      value: profile.personal.birthDate
        ? formatDate(profile.personal.birthDate)
        : "Chưa cập nhật",
    },
  ];

  const businessInfoItems = [
    { label: "Tên công ty", value: emptyValue(profile.business.company) },
    { label: "Mã số thuế", value: emptyValue(profile.business.taxCode) },
    {
      label: "Địa chỉ công ty",
      value: emptyValue(profile.business.companyAddress),
    },
    {
      label: "Người phụ trách",
      value: emptyValue(
        profile.business.companyRepresentative || profile.personal.fullName
      ),
    },
    {
      label: "Nhóm khách hàng",
      value: emptyValue(profile.business.customerGroup || "Khách hàng MECsu"),
    },
    {
      label: "Chiết khấu hiện tại",
      value: emptyValue(profile.business.currentDiscount),
    },
  ];

  const handleSavePersonalInfo = (data: UserPersonalInfo) => {
    setProfile((prev) => ({
      ...prev,
      personal: data,
    }));
  };

  const handleSaveBusinessInfo = (data: UserBusinessInfo) => {
    setProfile((prev) => ({
      ...prev,
      business: data,
    }));
  };

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 lg:text-3xl">
          Thông tin tài khoản
        </h1>
        <p className="mt-1 text-slate-500">
          Quản lý thông tin cá nhân và doanh nghiệp của bạn.
        </p>
      </div>

      {/* Two-column info sections */}
      <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <InfoSection
          title="Thông tin cá nhân"
          items={personalInfoItems}
          icon={UserIcon}
          showEditButton
          onEditClick={() => setIsPersonalModalOpen(true)}
          className="rounded-[20px] border-[#E5EAF2] shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition-all duration-200 hover:-translate-y-0.5"
        />

        <InfoSection
          title="Thông tin doanh nghiệp"
          items={businessInfoItems}
          icon={Building2}
          iconColor="blue"
          showEditButton
          onEditClick={() => setIsBusinessModalOpen(true)}
          className="rounded-[20px] border-[#E5EAF2] shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition-all duration-200 hover:-translate-y-0.5"
        />
      </section>

      {/* Security & Status Section */}
      <AccountSecurityStatusSection />

      {/* Personal Info Edit Modal */}
      <PersonalInfoEditModal
        isOpen={isPersonalModalOpen}
        onClose={() => setIsPersonalModalOpen(false)}
        data={profile.personal}
        onSave={handleSavePersonalInfo}
      />

      {/* Business Info Edit Modal */}
      <BusinessInfoEditModal
        isOpen={isBusinessModalOpen}
        onClose={() => setIsBusinessModalOpen(false)}
        data={profile.business}
        onSave={handleSaveBusinessInfo}
      />
    </div>
  );
}
