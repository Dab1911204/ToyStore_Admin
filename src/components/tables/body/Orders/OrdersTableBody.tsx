"use client";
import React, { useState } from "react";
import {
  TableBody,
  TableCell,
  TableRow,
} from "../../../ui/table";

import Button from "@/components/ui/button/Button";
import { FaWrench } from "react-icons/fa";
import { Modal } from "@/components/ui/modal";
import { useModal } from "@/hooks/useModal";
import Badge from "@/components/ui/badge/Badge";
import { FaEye } from "react-icons/fa6";

interface User {
  image: string;
  name: string;
}

interface NewsTableRow {
  id: string | number;
  user: User;
  projectName: string;
}

interface NewsTableBodyProps {
  tableData: NewsTableRow[];
}

const OrdersTableBody: React.FC<NewsTableBodyProps> = ({ tableData }) => {
  const { isOpen, openModal, closeModal } = useModal();
  const [modalType, setModalType] = useState<"update" | "detail" | null>(null);

  const handleOpen = (type: "update" | "detail") => {
    setModalType(type);
    openModal();
  };

  return (
    <>
      <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
        {tableData.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
              {order.id}
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
              Nguyễn Văn A
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
              0912345678
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
              Hà Nội
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
              10/10/2025
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
              500.000đ
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
              Nguyễn Văn B
            </TableCell>
            {/* Các cột khác */}
            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
              <Badge color="info" size="sm">Chờ xác nhận</Badge>
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
              <div className="flex flex-col gap-2">
                <Button
                  className="w-20"
                  size="xxs"
                  onClick={() => handleOpen("update")}
                  variant="warning"
                  startIcon={<FaWrench />}
                >
                  Cập nhật
                </Button>
                <Button
                  className="w-20"
                  size="xxs"
                  onClick={() => handleOpen("detail")}
                  variant="info"
                  startIcon={<FaEye />}
                >
                  Chi tiết
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      {/* Dùng 1 modal duy nhất */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            {modalType === "update" && (
              <>
                <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                  Cập nhật trạng thái đơn hàng
                </h4>
                <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                  Update your details to keep your profile up-to-date.
                </p>
              </>
            )}

            {modalType === "detail" && (
              <>
                <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                  Chi tiết đơn hàng
                </h4>
                <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                  Đây là nội dung chi tiết đơn hàng...
                </p>
              </>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default OrdersTableBody;
