import ComponentCard from "@/components/common/ComponentCard";
import { InfoOrder } from "@/components/common/Order/InfoOrder";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { ProductListOrder } from "@/components/common/Order/ProductListOrder";
import { Metadata } from "next";
import React from "react";
import { TableContextProvider } from "@/context/TableContext";
import { OrderProvider } from "@/context/OrderContext";

export const metadata: Metadata = {
  title: "Thêm đơn hàng"
};

const filter: { label: string; value: string }[] = [
  {
    label: "Đang chờ",
    value: "dangcho"
  },
  {
    label: "Đang giao",
    value: "danggiao"
  },
  {
    label: "Hoàn thành",
    value: "hoanthanh"
  },
  {
    label: "Đã hủy",
    value: "dahuy"
  },
  {
    label: "Tất cả",
    value: ""
  },
]

export default function CreateOrdersPage() {
  return (
    <div>
      <TableContextProvider initialUrl="/api/Product/admin?PageSize=15">
        <PageBreadcrumb pageTitle="Nhập kho hàng" pageParent="Quản lý quản lý" urlPageParent="/warehouses" itemSearch={true} />
        <OrderProvider>
          <div className="grid grid-cols-3 gap-4">
            <ComponentCard title="Danh sách sản phẩm" filter={filter} isOrder={true} isAdd={false} className="col-span-2 ">
              <div className="max-h-[600px] overflow-x-autoflex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
                <ProductListOrder />
              </div>
            </ComponentCard>
            <ComponentCard title="Toys-World" isOrder={true} isAdd={false}>
              <InfoOrder />
            </ComponentCard>
          </div>
        </OrderProvider>
      </TableContextProvider>
    </div>
  );
}
