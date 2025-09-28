import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import NewsTableDelete from "@/components/tables/main/News/NewsTableDeleted";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Tin Tức Đã Xóa"
};

export default function DeletedNewsPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Tin tức đã xóa" pageParent="Quản lý tin tức" urlPageParent="/news"/>
      <div className="space-y-6">
        <ComponentCard title="Danh sách tin tức" linkBtn="news" titleBtn="Tin Tức" isDelete={true}>
          <NewsTableDelete />
        </ComponentCard>
      </div>
    </div>
  );
}

