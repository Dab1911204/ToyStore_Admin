import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import AddForm from "@/components/form/Customer/AddForm";
import { FormProvider } from "@/context/FormContext";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Thêm khách hàng"
};

export default function CreateCustomerPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Thêm khách hàng" pageParent="Quản lý khách hàng" urlPageParent="/customers" />
      <FormProvider >
        <AddForm />
      </FormProvider>
    </div>
  );
}
