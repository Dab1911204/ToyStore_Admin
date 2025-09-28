import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ProductTable from "@/components/tables/main/Products/ProductTable";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Quản lý sản phẩm"
};

export default function ProductPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Quản lý sản phẩm"/>
      <div className="space-y-6">
        <ComponentCard title="Danh sách sản phẩm" isDelete={false} linkBtn="products" titleBtn="Sản Phẩm" isAdd={true}>
          <ProductTable />
        </ComponentCard>
      </div>
    </div>
  );
}