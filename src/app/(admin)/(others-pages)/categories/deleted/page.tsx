import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import CategoriesTableDelete from "@/components/tables/main/Categories/CategoriesTableDeleted";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Danh mục đã xóa"
};

export default function DeletedCategoriesPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Danh mục đã xóa" pageParent="Quản lý Danh mục" urlPageParent="/categories"/>
      <div className="space-y-6">
        <ComponentCard title="Danh sách Danh mục" linkBtn="categories" titleBtn="Danh Mục" isDelete={true}>
          <CategoriesTableDelete />
        </ComponentCard>
      </div>
    </div>
  );
}

