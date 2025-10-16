import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import WarehouseTableDelete from "@/components/tables/main/Warehouses/WarehouseTableDeleted";
import { TableContextProvider } from "@/context/TableContext";

import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Danh sách sản phẩm Đã Xóa"
};

const filter: { label: string; value: string }[]= [
  {
    label:"Hàng cũ",
    value:"hàng cũ"
  },
  {
    label:"Hàng mới",
    value:"Hàng mới"
  },
  {
    label:"Tất cả",
    value:""
  },
]

export default function DeletedNewsPage() {
  return (
    <div>
      <TableContextProvider initialUrl="/api/Warehouse/Delete?PageSize=15">
      <PageBreadcrumb pageTitle="Sản phẩm đã xóa" pageParent="Quản lý kho hàng" urlPageParent="/warehouses" itemSearch={true}/>
      <div className="space-y-6">
        <ComponentCard title="Danh sách sản phẩm" linkBtn="warehouses" titleBtn="Kho Hàng" isDelete={false} filter={filter}>
          <WarehouseTableDelete />
        </ComponentCard>
      </div>
      </TableContextProvider>
    </div>
  );
}

