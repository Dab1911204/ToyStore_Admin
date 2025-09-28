import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import EditForm from "@/components/form/Employees/EditForm";
import { FormProvider } from "@/context/FormContext";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Thêm nhân viên"
};

export default function CreateEmployeesPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Sửa nhân viên" pageParent="Quản lý nhân viên" urlPageParent="/employees" />
      <FormProvider >
        <EditForm />
      </FormProvider>
    </div>
  );
}
