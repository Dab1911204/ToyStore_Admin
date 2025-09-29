import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import OrdersTable from "@/components/tables/main/Orders/OrdersTable";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Quản lý đơn hàng"
};

const filter: { label: string; value: string }[]= [
  {
    label:"Đang chờ",
    value:"dangcho"
  },
  {
    label:"Đang giao",
    value:"danggiao"
  },
  {
    label:"Hoàn thành",
    value:"hoanthanh"
  },
  {
    label:"Đã hủy",
    value:"dahuy"
  },
  {
    label:"Tất cả",
    value:""
  },
]

export default function OrdersPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Quản lý đơn hàng" itemSearch={true}/>
      <div className="space-y-6">
        <ComponentCard title="Danh sách đơn hàng" filter={filter} isOrder={true} linkBtn="orders" titleBtn="Đơn Hàng" isAdd={true}>
          <OrdersTable />
        </ComponentCard>
      </div>
    </div>
  );
}