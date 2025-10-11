"use client"
import React from "react";
import {
  TableBody,
  TableCell,
  TableRow,
} from "../../../ui/table";

import { RiResetLeftFill } from "react-icons/ri";

import Button from "@/components/ui/button/Button";
import { FaEye } from "react-icons/fa6";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import { SupplierType } from "@/schemaValidations/supplier.shema";

interface SupplierTableBodyProps {
  tableData: SupplierType[];
  onOpenModal: (type: "delete" | "detail", id?: string) => void;
}

const SupplierTableBodyDelete: React.FC<SupplierTableBodyProps> = ({
  tableData,
  onOpenModal,
}) => {
  return (
    <>
      <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
        {tableData.map((supplier, index) => (
          <TableRow key={supplier.id}>
            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
              {index + 1}
            </TableCell>           
            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
              {supplier.supplierName}
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
              {supplier.phone}
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
              {supplier.email}
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
              {supplier.address}
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
              {supplier.note} 
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
              <div className="flex flex-col gap-2">
                <Button className="w-20" size="xxs" variant="info" startIcon={<FaEye />}>
                  Chi tiết
                </Button>
                <Button className="w-20" size="xxs" variant="danger" startIcon={<RiResetLeftFill />}>
                  Khôi phục
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
}

export default SupplierTableBodyDelete;