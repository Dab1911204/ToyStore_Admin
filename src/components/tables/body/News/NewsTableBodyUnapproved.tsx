"use client"
import React from "react";
import {
  TableBody,
  TableCell,
  TableRow,
} from "../../../ui/table";

import Button from "@/components/ui/button/Button";
import { FaEye } from "react-icons/fa6";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import { AiFillCheckCircle } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { FaDeleteLeft } from "react-icons/fa6";
import Image from "next/image";
import Badge from "@/components/ui/badge/Badge";

interface User {
  image: string;
  name: string;
}

interface NewsTableRow {
  id: string | number;
  user: User;
  projectName: string;
  // Add other fields if needed
}

interface NewsTableBodyProps {
  tableData: NewsTableRow[];
}

const NewsTableBodyUnapproved: React.FC<NewsTableBodyProps> = ({
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
              <Image 
                width={100}
                height={100}
                src="/images/product/product-03.jpg"
                alt={order.user.name}
              />
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
              Tết thiếu nhi
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
              28/8/2025
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
              <Badge color="warning" size="sm">
                Chờ duyệt
              </Badge>
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
              <div className="flex flex-col gap-2">
                <Button onClick={openModal} className="w-20" size="xxs" variant="info" startIcon={<FaEye />}>
                  Chi tiết
                </Button>
                <Button className="w-20" size="xxs" variant="success" startIcon={<AiFillCheckCircle />}>
                  Duyệt
                </Button>
                <Button className="w-20" size="xxs" variant="warning" startIcon={<FiEdit />}>
                  Sửa
                </Button>
                <Button className="w-20" size="xxs" variant="danger" startIcon={<FaDeleteLeft />}>
                  Xóa
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Chi tiết tin tức
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

export default NewsTableBodyUnapproved;