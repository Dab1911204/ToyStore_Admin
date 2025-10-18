import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import CustomerTable from "@/components/tables/main/Customers/CustomerTable";
import { TableContextProvider } from "@/context/TableContext";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Quản lý khách hàng"
};

const filter: { label: string; value: string }[] = [
  {
    label: "Đang hoạt động",
    value: "Đang hoạt động"
  },
  {
    label: "Dừng hoạt động",
    value: "Dừng hoạt động"
  },
  {
    label: "Tất cả",
    value: ""
  },
]

export default function CustomerPage() {
  return (
    <div>
      <TableContextProvider initialUrl="/apiCustomer/Customer?pageSize=15">
        <PageBreadcrumb pageTitle="Quản lý khách hàng" itemSearch={true} />
        <div className="space-y-6">
          <ComponentCard title="Danh sách khách hàng" filter={filter}>
            <CustomerTable />
          </ComponentCard>
        </div>
      </TableContextProvider>
    </div>
  );
}