"use client";
import React from "react";
import {
  TableBody,
  TableCell,
  TableRow,
} from "../../../ui/table";

import Button from "@/components/ui/button/Button";
import { FaWrench } from "react-icons/fa";
import Badge from "@/components/ui/badge/Badge";
import { FaEye } from "react-icons/fa6";
import { OrderType } from "@/schemaValidations/order.schema";


interface NewsTableBodyProps {
  tableData: OrderType[];
  onOpenModal: (type: "update" | "detail", id?: string) => void;
}

const OrdersTableBody: React.FC<NewsTableBodyProps> = ({ tableData, onOpenModal}: NewsTableBodyProps) => {

  return (
    <>
      <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
        {tableData.map((order,index) => (
          <TableRow key={order.id}>
            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
              {index+ 1}
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
              Email
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
              {order.phone}
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
              {order.address}
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
              {order.orderDate}
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
              {order.totalPrice}
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
                  onClick={() => onOpenModal("update", order.id)}
                  variant="warning"
                  startIcon={<FaWrench />}
                >
                  Cập nhật
                </Button>
                <Button
                  className="w-20"
                  size="xxs"
                  onClick={() => onOpenModal("detail", order.id)}
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
    </>
  );
};

export default OrdersTableBody;
