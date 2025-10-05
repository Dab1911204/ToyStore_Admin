import ComponentCard from "@/components/common/ComponentCard";
import { InfoOrder } from "@/components/common/InfoOrder";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { ProductList } from "@/components/common/ProductList";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Thêm đơn hàng"
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

export default function CreateOrdersPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Thêm đơn hàng" pageParent="Quản lý đơn hàng" urlPageParent="/orders" itemSearch={true}/>
      <div className="grid grid-cols-3 gap-4">
        <ComponentCard title="Danh sách sản phẩm" filter={filter} isOrder={true} isAdd={false} className="col-span-2 ">
          <div className="max-h-[600px] overflow-x-autoflex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
            <ProductList />
          </div>
        </ComponentCard>
        <ComponentCard title="Toys-World" isOrder={true} isAdd={false}>
          <InfoOrder />
        </ComponentCard>
      </div>
    </div>
  );
}
