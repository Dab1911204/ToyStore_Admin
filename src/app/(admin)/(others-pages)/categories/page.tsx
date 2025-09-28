import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import CategoriesTable from "@/components/tables/main/Categories/CategoriesTable";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Quản lý danh mục"
};

export default function CategoriesPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Quản lý danh mục"/>
      <div className="space-y-6">
        <ComponentCard title="Danh sách danh mục" isDelete={false} linkBtn="categories" titleBtn="Danh Mục" isAdd={true}>
          <CategoriesTable />
        </ComponentCard>
      </div>
    </div>
  );
}