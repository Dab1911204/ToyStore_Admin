"use client"
import React from "react";
import {
  TableBody,
  TableCell,
  TableRow,
} from "../../../ui/table";
import Button from "@/components/ui/button/Button";
import Link from "next/link";
import { FaEye, FaWrench } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { WarehouseItemType } from "@/schemaValidations/warehouse.schema";
import { formatCurrency, formatDateTime } from "@/utils/format";

interface WarehousesTableBodyProps {
  tableData: WarehouseItemType[];
  onOpenModal: (type: "delete" | "detail", id?: string) => void;
}

const WarehouseTableBody: React.FC<WarehousesTableBodyProps> = ({
  tableData,
  onOpenModal,

}) => {
  tableData.map(warehouses => {
    warehouses.totalPrice = warehouses.details.reduce(
      (sum,item) => sum + item.importPrice * item.quantity,
      0
    )
  })
  return (
    <>
      <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
        {tableData.map((warehouses, index) => (
          <TableRow key={warehouses.id}>
            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
              {index + 1}
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
              {formatCurrency(warehouses.totalPrice)}
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
              {formatDateTime(warehouses.dateEntered)}
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
              nguyễn văn a
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
              <div className="flex flex-col gap-2">
                <Link href={"/warehouses/edit/" + warehouses.id}>
                  <Button className="w-20" size="xxs" variant="warning" startIcon={<FaWrench />}>
                    Sửa
                  </Button>
                </Link>
                <Link href={"/warehouses/edit/" + warehouses.id}>
                  <Button className="w-20" size="xxs" variant="info" startIcon={<FaEye />}>
                    Chi tiết
                  </Button>
                </Link>
                <Button onClick={() => onOpenModal("delete", warehouses.id)} className="w-20" size="xxs" variant="danger" startIcon={<FaDeleteLeft />}>
                  Xóa
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
}

export default WarehouseTableBody;