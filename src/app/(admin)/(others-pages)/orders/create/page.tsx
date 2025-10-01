import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Thêm đơn hàng"
};

export default function CreateOrdersPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Thêm đơn hàng" pageParent="Quản lý đơn hàng" urlPageParent="/orders" />
      <div className="grid grid-cols-2 gap-4">
        <ComponentCard title="Danh sách tin tức" isDelete={false} linkBtn="news" titleBtn="Tin Tức" isAdd={false}>
          sjjsjs
        </ComponentCard>
        <div className="">
          hshsh
        </div>
      </div>
    </div>
  );
}
