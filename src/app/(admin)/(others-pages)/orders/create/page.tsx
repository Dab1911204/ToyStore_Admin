import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import AddForm from "@/components/form/Orders/AddForm";
import { FormProvider } from "@/context/FormContext";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Thêm đơn hàng"
};

export default function CreateOrdersPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Thêm đơn hàng" pageParent="Quản lý đơn hàng" urlPageParent="/orders" />
      <FormProvider >
        <AddForm />
      </FormProvider>
    </div>
  );
}
