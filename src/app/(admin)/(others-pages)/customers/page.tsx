import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import CustomerTable from "@/components/tables/main/Customers/CustomerTable";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Quản lý khách hàng"
};

export default function CustomerPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Quản lý khách hàng"/>
      <div className="space-y-6">
        <ComponentCard title="Danh sách khách hàng" isDelete={false} linkBtn="customers" titleBtn="Khách Hàng" isAdd={true}>
          <CustomerTable />
        </ComponentCard>
      </div>
    </div>
  );
}