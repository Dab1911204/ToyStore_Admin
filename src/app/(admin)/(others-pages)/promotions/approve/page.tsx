import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PromotionsTableBodyUnapproved from "@/components/tables/main/Promotions/PromotionsTableUnapproved";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Khuyến Mãi chờ duyệt"
};

export default function ApprovePromotionsPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Khuyến mãi chờ duyệt" pageParent="Quản lý khuyến mãi" urlPageParent="/promotions" itemSearch={true}/>
      <div className="space-y-6">
        <ComponentCard title="Danh sách khuyến mãi" linkBtn="promotions" titleBtn="Khuyến Mãi" isDelete={true}>
          <PromotionsTableBodyUnapproved />
        </ComponentCard>
      </div>
    </div>
  );
}

