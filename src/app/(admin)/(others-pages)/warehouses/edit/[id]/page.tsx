import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import EditForm from "@/components/form/Warehouse/EditForm";
import { FormProvider } from "@/context/FormContext";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Sửa sản phẩm trong kho"
};

export default function EditProductPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Sửa sản phẩm trong kho" pageParent="Quản lý kho hàng" urlPageParent="/warehouses" />
      <FormProvider >
        <EditForm />
      </FormProvider>
    </div>
  );
}
