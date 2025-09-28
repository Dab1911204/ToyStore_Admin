import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import WarehouseTable from "@/components/tables/main/Warehouses/WarehouseTable";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Quản lý kho hàng"
};

export default function WarehousePage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Quản lý kho hàng"/>
      <div className="space-y-6">
        <ComponentCard title="Danh sách sản phẩm" isDelete={false} linkBtn="warehouses" titleBtn="Sản Phẩm" isAdd={true}>
          <WarehouseTable />
        </ComponentCard>
      </div>
    </div>
  );
}