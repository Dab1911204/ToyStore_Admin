"use client"
import React from "react";
import {
  TableBody,
  TableCell,
  TableRow,
} from "../../../ui/table";

import Image from "next/image";
import Button from "@/components/ui/button/Button";
import Link from "next/link";
import { FaWrench, FaEye } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { useModal } from "@/hooks/useModal";
import { NewsType } from "@/schemaValidations/news.schema";

interface NewsTableBodyProps {
  tableData: NewsType[];
  onOpenModal: (type: "delete" | "detail",id?:string) => void;
}

const NewsTableBody: React.FC<NewsTableBodyProps> = ({
  tableData,
  onOpenModal,
}) => {
  return (
    <>
      <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
        {tableData.map((news,index) => (
          <TableRow key={news.id}>
            {/* ID */}
            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
              {index+1}
            </TableCell>

            {/* Ảnh thumbnail */}
            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
              <div className="flex -space-x-2">
                <div className="w-15 h-15 overflow-hidden rounded-full">
                  <Image
                    width={100}
                    height={100}
                    src={news.thumbnail || "/default-news.jpg"} // fallback nếu chưa có ảnh
                    alt={news.title}
                  />
                </div>
              </div>
            </TableCell>

            {/* Tiêu đề tin */}
            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
              {news.title}
            </TableCell>

            {/* Ngày tạo */}
            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
              {new Date(news.createdOn).toLocaleDateString("vi-VN")}
            </TableCell>

            {/* Tác giả */}
            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
              {news.author || "Chưa rõ"}
            </TableCell>

            {/* Trạng thái */}
            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
              {news.status === "published" ? "Đã đăng" : news.status === "draft" ? "Nháp" : "Lưu trữ"}
            </TableCell>

            {/* Action */}
            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
              <div className="flex flex-col gap-2">
                <Link href={`/news/edit/${news.id}`}>
                  <Button className="w-20" size="xxs" variant="warning" startIcon={<FaWrench />}>
                    Sửa
                  </Button>
                </Link>
                <Button className="w-20" size="xxs" variant="info" startIcon={<FaEye />}>
                  Chi tiết
                </Button>
               
                  <Button onClick={() => onOpenModal("delete",news.id)} className="w-20" size="xxs" variant="danger" startIcon={<FaDeleteLeft />}>
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

export default NewsTableBody;

