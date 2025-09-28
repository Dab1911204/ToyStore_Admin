import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import EditForm from "@/components/form/Promotions/EditForm";
import { FormProvider } from "@/context/FormContext";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Sửa khuyến mãi"
};

export default function EditPromotionsPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Thêm khuyến mãi" pageParent="Quản lý khuyến mãi" urlPageParent="/promotions" />
      <FormProvider >
        <EditForm />
      </FormProvider>
    </div>
  );
}
