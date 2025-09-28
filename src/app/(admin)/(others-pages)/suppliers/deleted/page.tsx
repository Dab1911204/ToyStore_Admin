import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import SupplierTableDelete from "@/components/tables/main/Suppliers/SupplierTableDeleted";

import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Nhà cung cấp Đã Xóa"
};

export default function DeletedNewsPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Nhà cung cấp đã xóa" pageParent="Quản lý nhà cung cấp" urlPageParent="/suppliers"/>
      <div className="space-y-6">
        <ComponentCard title="Danh sách nhà cung cấp" linkBtn="suppliers" titleBtn="Nhà Cung Cấp" isDelete={false}>
          <SupplierTableDelete />
        </ComponentCard>
      </div>
    </div>
  );
}

