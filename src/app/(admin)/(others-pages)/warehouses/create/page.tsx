import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import AddForm from "@/components/form/Warehouse/AddForm";
import { FormProvider } from "@/context/FormContext";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Thêm sản phẩm"
};

export default function CreateNewsPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Thêm sản phẩm" pageParent="Quản lý kho hàng" urlPageParent="/warehouses" />
      <FormProvider >
        <AddForm />
      </FormProvider>
    </div>
  );
}
