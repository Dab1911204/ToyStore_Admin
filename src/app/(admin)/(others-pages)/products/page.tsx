import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ProductTable from "@/components/tables/main/Products/ProductTable";
import { TableContextProvider } from "@/context/TableContext";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Quản lý sản phẩm"
};

const filter: { label: string; value: string }[]= [
  {
    label:"Còn hàng",
    value:"conhang"
  },
  {
    label:"Hết hàng",
    value:"hethang"
  },
  {
    label:"Tất cả",
    value:""
  },
  {
    label:"Hot",
    value:"hot"
  }
]

export default function ProductPage() {
  return (
    <div>
      <TableContextProvider initialUrl="/api/Product/admin">
        <PageBreadcrumb pageTitle="Quản lý sản phẩm" itemSearch={true}/>
        <div className="space-y-6">
          <ComponentCard title="Danh sách sản phẩm" filter={filter} isDelete={false} linkBtn="products" titleBtn="Sản Phẩm" isAdd={true}>
            <ProductTable />
          </ComponentCard>
        </div>
      </TableContextProvider>
    </div>
  );
}