"use client";
import { formatDateTime } from "@/utils/format";
import React from "react";

interface ProductPromotion {
  id: string;
  name: string;
  price: number; // dùng "price" như dữ liệu gốc
  discountedPrice: number;
}

interface PromotionDetailProps {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  discountPercent: number;
  isApproved: boolean;
  products: ProductPromotion[];
}

export default function ModelDetailPromotion({
  title,
  description,
  startDate,
  endDate,
  discountPercent,
  isApproved,
  products,
}: PromotionDetailProps) {

  return (
    <div className="mx-auto space-y-4 text-sm m">
      {/* --- Thông tin khuyến mãi --- */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm bg-white dark:bg-gray-900">
        <h2 className="text-base font-semibold text-gray-800 dark:text-white mb-3">
          Thông tin khuyến mãi
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-xs">Tên khuyến mãi</p>
            <p className="font-medium text-gray-800 dark:text-white truncate">
              {title}
            </p>
          </div>

          <div>
            <p className="text-gray-500 dark:text-gray-400 text-xs">Phần trăm khuyến mãi</p>
            <p className="font-medium text-green-600 dark:text-green-400">
              {discountPercent}%
            </p>
          </div>

          <div>
            <p className="text-gray-500 dark:text-gray-400 text-xs">Ngày bắt đầu</p>
            <p className="font-medium text-gray-800 dark:text-white">
              {formatDateTime(startDate)}
            </p>
          </div>

          <div>
            <p className="text-gray-500 dark:text-gray-400 text-xs">Ngày kết thúc</p>
            <p className="font-medium text-gray-800 dark:text-white">
              {formatDateTime(endDate)}
            </p>
          </div>

          <div className="col-span-1 sm:col-span-2">
            <p className="text-gray-500 dark:text-gray-400 text-xs">Mô tả</p>
            <div
              className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300"
              dangerouslySetInnerHTML={{
                __html: description || "<p>Không có mô tả.</p>",
              }}
            />
          </div>

          <div>
            <p className="text-gray-500 dark:text-gray-400 text-xs">Trạng thái duyệt</p>
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                isApproved
                  ? "bg-green-100 text-green-700 dark:bg-green-700/20 dark:text-green-300"
                  : "bg-yellow-100 text-yellow-700 dark:bg-yellow-700/20 dark:text-yellow-300"
              }`}
            >
              {isApproved ? "Đã duyệt" : "Chưa duyệt"}
            </span>
          </div>
        </div>
      </div>

      {/* --- Danh sách sản phẩm --- */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm bg-white dark:bg-gray-900">
        <h2 className="text-base font-semibold text-gray-800 dark:text-white mb-3">
          Sản phẩm áp dụng
        </h2>

        {products.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-xs">
            Không có sản phẩm áp dụng.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                  <th className="p-2 text-left">Tên sản phẩm</th>
                  <th className="p-2 text-right">Giá gốc</th>
                  <th className="p-2 text-right">Giá sau giảm</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <td className="p-2 text-gray-800 dark:text-white">{item.name}</td>
                    <td className="p-2 text-right text-gray-500 dark:text-gray-400">
                      {item.price.toLocaleString()} ₫
                    </td>
                    <td className="p-2 text-right font-medium text-green-600 dark:text-green-400">
                      {item.discountedPrice.toLocaleString()} ₫
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
