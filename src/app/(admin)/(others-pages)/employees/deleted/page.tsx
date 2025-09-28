import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import EmployeesTableDeleted from "@/components/tables/main/Employees/EmployeesTableDeleted";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Nhân Viên Đã Xóa"
};

export default function DeletedEmployeesPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Nhân viên đã xóa" pageParent="Quản lý nhân viên" urlPageParent="/employees"/>
      <div className="space-y-6">
        <ComponentCard title="Danh sách nhân viên" linkBtn="employees" titleBtn="Nhân Viên" isDelete={true}>
          <EmployeesTableDeleted />
        </ComponentCard>
      </div>
    </div>
  );
}

