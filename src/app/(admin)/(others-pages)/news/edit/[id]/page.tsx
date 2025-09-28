import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import EditForm from "@/components/form/News/EditForm";
import { FormProvider } from "@/context/FormContext";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Sửa tin tức"
};

export default function EditNewsPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Thêm tin tức" pageParent="Quản lý tin tức" urlPageParent="/news" />
      <FormProvider >
        <EditForm />
      </FormProvider>
    </div>
  );
}
