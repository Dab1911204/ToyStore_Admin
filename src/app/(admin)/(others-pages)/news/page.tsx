import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import NewsTable from "@/components/tables/main/News/NewsTable";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Quản lý tin tức"
};

export default function NewsPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Quản lý tin tức"/>
      <div className="space-y-6">
        <ComponentCard title="Danh sách tin tức" isDelete={false} linkBtn="news" titleBtn="Tin Tức" isAdd={true}>
          <NewsTable />
        </ComponentCard>
      </div>
    </div>
  );
}