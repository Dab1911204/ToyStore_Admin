"use client"
import React from "react";
import {
  TableBody,
  TableCell,
  TableRow,
} from "../../../ui/table";
import Button from "@/components/ui/button/Button";
import Link from "next/link";
import { FaWrench,FaEye  } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { Modal } from "@/components/ui/modal";
import { useModal } from "@/hooks/useModal";
import Badge from "@/components/ui/badge/Badge";


interface User {
  image: string;
  name: string;
}

interface WarehousesTableRow {
  id: string | number;
  user: User;
  projectName: string;
  // Add other fields if needed
}

interface WarehousesTableBodyProps {
  tableData: WarehousesTableRow[];
}

const WarehouseTableBody: React.FC<WarehousesTableBodyProps> = ({
  tableData,
}) => {
  const { isOpen, openModal, closeModal } = useModal();
  return (
    <>
      <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
        {tableData.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
              {order.id}
            </TableCell>
            
            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
              {order.projectName}
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
              Nhà cung cấp A
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
              50.000đ
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
              100
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
              5.000.000đ
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
              <Badge color="success" size="sm">Hàng cũ</Badge>
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
              Nguyễn Văn A
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
              Nguyễn Văn A
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
              <div className="flex flex-col gap-2">
                <Link href={"/warehouses/edit/"+order.id}>
                  <Button className="w-20" size="xxs" variant="warning" startIcon={<FaWrench />}>
                    Sửa
                  </Button>
                </Link>
                <Button onClick={openModal} className="w-20" size="xxs" variant="info" startIcon={<FaEye />}>
                  Chi tiết
                </Button>
                <Link href={"/products/"+order.id}>
                  <Button className="w-20" size="xxs" variant="danger" startIcon={<FaDeleteLeft />}>
                    Xóa
                  </Button>
                </Link>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Chi tiết sản phẩm
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Update your details to keep your profile up-to-date.
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default WarehouseTableBody;