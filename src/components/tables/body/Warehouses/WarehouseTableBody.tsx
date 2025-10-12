"use client"
import React from "react";
import {
  TableBody,
  TableCell,
  TableRow,
} from "../../../ui/table";
import Button from "@/components/ui/button/Button";
import Link from "next/link";
import { FaWrench, FaEye } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import Badge from "@/components/ui/badge/Badge";
import { WarehouseType } from "@/schemaValidations/warehouse.schema";
import { formatCurrency } from "@/utils/format";

interface WarehousesTableBodyProps {
  tableData: WarehouseType[];
}

const WarehouseTableBody: React.FC<WarehousesTableBodyProps> = ({
  tableData,
}) => {
  return (
    <>
      <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
        {tableData.map((warehouses, index) => (
          <TableRow key={warehouses.id}>
            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
              {index + 1}
            </TableCell>

            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
              {warehouses.productName}
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
              {warehouses.supplierName}
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
              {formatCurrency(warehouses.price)}
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
              {warehouses.quantity}
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
              {formatCurrency(warehouses.totalPrice)}
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
              <Badge color="success" size="sm">Hàng cũ</Badge>
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
              {warehouses.createdBy}
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
              {warehouses.updatedBy}
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
              <div className="flex flex-col gap-2">
                <Link href={"/warehouses/edit/" + warehouses.id}>
                  <Button className="w-20" size="xxs" variant="warning" startIcon={<FaWrench />}>
                    Sửa
                  </Button>
                </Link>
                <Link href={"/products/" + warehouses.id}>
                  <Button className="w-20" size="xxs" variant="danger" startIcon={<FaDeleteLeft />}>
                    Xóa
                  </Button>
                </Link>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
}

export default WarehouseTableBody;