import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import CustomerTableDelete from "@/components/tables/main/Customers/CustomerTableDeleted";

import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Khách hàng cấp Đã Xóa"
};

export default function DeletedCustomerPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Khách hàng đã xóa" pageParent="Quản lý khách hàng" urlPageParent="/customers"/>
      <div className="space-y-6">
        <ComponentCard title="Danh sách khách hàng" linkBtn="customers" titleBtn="Khách Hàng" isDelete={false}>
          <CustomerTableDelete />
        </ComponentCard>
      </div>
    </div>
  );
}

