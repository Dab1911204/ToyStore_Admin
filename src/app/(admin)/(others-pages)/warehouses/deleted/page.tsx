import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import WarehouseTableDelete from "@/components/tables/main/Warehouses/WarehouseTableDeleted";

import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Sản phẩm Đã Xóa"
};

export default function DeletedNewsPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Sản phẩm đã xóa" pageParent="Quản lý kho hàng" urlPageParent="/warehouses"/>
      <div className="space-y-6">
        <ComponentCard title="Danh sách sản phẩm" linkBtn="warehouses" titleBtn="Kho Hàng" isDelete={false}>
          <WarehouseTableDelete />
        </ComponentCard>
      </div>
    </div>
  );
}

