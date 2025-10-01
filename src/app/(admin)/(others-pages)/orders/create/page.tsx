import ComponentCard from "@/components/common/ComponentCard";
import { InfoOrder } from "@/components/common/InfoOrder";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { ProductList } from "@/components/common/ProductList";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Thêm đơn hàng"
};

export default function CreateOrdersPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Thêm đơn hàng" pageParent="Quản lý đơn hàng" urlPageParent="/orders" itemSearch={true}/>
      <div className="grid grid-cols-3 gap-4">
        <ComponentCard title="Danh sách sản phẩm" isOrder={true} isAdd={false} className="col-span-2">
          <ProductList/>
        </ComponentCard>
        <InfoOrder/>
      </div>
    </div>
  );
}
