import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ProductTableDelete from "@/components/tables/main/Products/ProductTableDeleted";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Sản phẩm Đã Xóa"
};

export default function DeletedNewsPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Sản phẩm đã xóa" pageParent="Quản lý sản phẩm" urlPageParent="/products"/>
      <div className="space-y-6">
        <ComponentCard title="Danh sách sản phẩm" linkBtn="products" titleBtn="Sản Phẩm" isDelete={true}>
          <ProductTableDelete />
        </ComponentCard>
      </div>
    </div>
  );
}

