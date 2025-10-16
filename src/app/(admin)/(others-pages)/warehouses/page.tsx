import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import WarehouseTable from "@/components/tables/main/Warehouses/WarehouseTable";
import { TableContextProvider } from "@/context/TableContext";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Quản lý kho hàng"
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


export default function WarehousePage() {
  return (
    <div>
      <TableContextProvider initialUrl="api/Warehouse?PageSize=15">
      <PageBreadcrumb pageTitle="Quản lý kho hàng" itemSearch={true}/>
      <div className="space-y-6">
        <ComponentCard title="Danh sách sản phẩm" filter={filter} isDelete={false} linkBtn="warehouses" titleBtn="Sản Phẩm" isAdd={true}>
          <WarehouseTable />
        </ComponentCard>
      </div>
      </TableContextProvider>
    </div>
  );
}