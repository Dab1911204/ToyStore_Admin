import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import EditForm from "@/components/form/Customer/EditForm";
import { FormProvider } from "@/context/FormContext";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Sửa khách hàng"
};

export default function EditCustomerPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Sửa khách hàng" pageParent="Quản lý khách hàng" urlPageParent="/customers" />
      <FormProvider >
        <EditForm />
      </FormProvider>
    </div>
  );
}
