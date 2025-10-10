"use client";
import { formatDateTime } from "@/utils/format";
import React from "react";

interface ProductPromotion {
  id: string;
  name: string;
  price: number;
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
    <div>
      {/* --- Thông tin khuyến mãi --- */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm bg-white dark:bg-gray-900">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          🎉 Thông tin khuyến mãi
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Tên khuyến mãi</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white truncate">
              {title}
            </p>
          </div>

          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Phần trăm khuyến mãi</p>
            <p className="text-lg font-semibold text-green-600 dark:text-green-400">
              {discountPercent}%
            </p>
          </div>

          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Ngày bắt đầu</p>
            <p className="text-lg text-gray-900 dark:text-white">
              {formatDateTime(startDate)}
            </p>
          </div>

          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Ngày kết thúc</p>
            <p className="text-lg text-gray-900 dark:text-white">
              {formatDateTime(endDate)}
            </p>
          </div>

          <div className="col-span-1 sm:col-span-2">
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Mô tả</p>
            <div
              className="prose prose-base dark:prose-invert max-w-none text-gray-800 dark:text-gray-200 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: description || "<p>Không có mô tả.</p>",
              }}
            />
          </div>

          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Trạng thái duyệt</p>
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${
                isApproved
                  ? "bg-green-100 text-green-700 dark:bg-green-700/30 dark:text-green-300"
                  : "bg-yellow-100 text-yellow-700 dark:bg-yellow-700/30 dark:text-yellow-300"
              }`}
            >
              {isApproved ? "Đã duyệt" : "Chưa duyệt"}
            </span>
          </div>
        </div>
      </div>

      {/* --- Danh sách sản phẩm --- */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm bg-white dark:bg-gray-900">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          🛒 Sản phẩm áp dụng
        </h2>

        {products.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400 text-base italic">
            Không có sản phẩm áp dụng.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <th className="p-3 text-left font-semibold">Tên sản phẩm</th>
                  <th className="p-3 text-right font-semibold">Giá gốc</th>
                  <th className="p-3 text-right font-semibold">Giá sau giảm</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition"
                  >
                    <td className="p-3 text-gray-900 dark:text-white text-base">{item.name}</td>
                    <td className="p-3 text-right text-gray-500 dark:text-gray-400 text-base">
                      {item.price.toLocaleString()} ₫
                    </td>
                    <td className="p-3 text-right font-semibold text-green-600 dark:text-green-400 text-base">
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
