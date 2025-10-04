import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import CustomerTableDelete from "@/components/tables/main/Customers/CustomerTableDeleted";

import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Khách hàng cấp Đã Xóa"
};

const filter: { label: string; value: string }[]= [
  {
    label:"Đang hoạt động",
    value:"Đang hoạt động"
  },
  {
    label:"Dừng hoạt động",
    value:"Dừng hoạt động"
  },
  {
    label:"Tất cả",
    value:""
  },
]

export default function DeletedCustomerPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Khách hàng đã xóa" pageParent="Quản lý khách hàng" urlPageParent="/customers" itemSearch={true}/>
      <div className="space-y-6">
        <ComponentCard title="Danh sách khách hàng" linkBtn="customers" titleBtn="Khách Hàng" isDelete={false} filter={filter}>
          <CustomerTableDelete />
        </ComponentCard>
      </div>
    </div>
  );
}

