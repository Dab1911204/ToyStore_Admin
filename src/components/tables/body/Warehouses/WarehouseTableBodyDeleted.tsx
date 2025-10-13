"use client"
import React from "react";
import {
  TableBody,
  TableCell,
  TableRow,
} from "../../../ui/table";

import { RiResetLeftFill } from "react-icons/ri";

import Image from "next/image";
import Button from "@/components/ui/button/Button";
import { FaEye } from "react-icons/fa6";
import { useModal } from "@/hooks/useModal";
import Badge from "@/components/ui/badge/Badge";
import { WarehouseType } from "@/schemaValidations/warehouse.schema";
import { formatCurrency } from "@/utils/format";


interface WarehousesTableBodyProps {
  tableData: WarehouseType[];
  onOpenModal: (type: "delete" | "detail" | "restore", id?: string) => void;
}

const WarehouseTableBodyDelete: React.FC<WarehousesTableBodyProps> = ({
  tableData,
  onOpenModal,
}) => {
  const { isOpen, openModal, closeModal } = useModal();
  return (
    <>
      <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
        {tableData.map((warehouse, index) => (
          <TableRow key={warehouse.id}>
            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
              {index + 1}
            </TableCell>

            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
              {warehouse.productName}
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
              {warehouse.supplierName}
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
              {formatCurrency(warehouse.price)}
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
              {warehouse.quantity}
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
              {formatCurrency(warehouse.totalPrice)}
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
              <Badge color="success" size="sm">Hàng cũ</Badge>
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
              {warehouse.createdBy}
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
              <div className="flex flex-col gap-2">
                <Button onClick={openModal} className="w-20" size="xxs" variant="info" startIcon={<FaEye />}>
                  Chi tiết
                </Button>
                <Button onClick={()=>onOpenModal("restore",warehouse.id)} className="w-20" size="xxs" variant="warning" startIcon={<RiResetLeftFill />}>
                  Khôi phục
                </Button>
            </div>
          </TableCell>
          </TableRow>
        ))}
    </TableBody >
    </>
  );
}

export default WarehouseTableBodyDelete;