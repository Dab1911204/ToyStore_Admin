"use client";

import Image from "next/image";
import { useState } from "react";

export const ProductItemWarehouse = () => {
  const [quantity, setQuantity] = useState(1);
  const inStock = true;

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (val >= 0) setQuantity(val);
  };

  const handleAddToCart = () => {
    alert(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`);
  };

  return (
    <div className="w-44 rounded-xl shadow-md bg-white dark:bg-gray-800 overflow-hidden flex flex-col transition-transform hover:scale-[1.02] duration-200">
      {/* Ảnh sản phẩm */}
      <div className="relative h-40">
        <Image
          src="/images/grid-image/image-03.png"
          alt="Sản phẩm"
          width={180}
          height={200}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Thông tin sản phẩm */}
      <div className="flex flex-col justify-between flex-1 px-2 py-2">
        <div>
          <span className="text-xs font-semibold text-gray-800 dark:text-white block truncate">
            Rau cải xanh
          </span>
          <span className="text-[11px] text-gray-500 block">
            Nhà cung cấp: VyFarm
          </span>

          {/* Giá tiền */}
          <div className="mt-1">
          </div>

          {/* Số lượng trong kho */}
        </div>

        {/* Số lượng + Giỏ hàng */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1">
            <input
              type="number"
              value={quantity}
              onChange={handleChange}
              className="w-10 border border-gray-300 rounded-md text-center text-[11px] py-0.5 dark:bg-gray-700 dark:text-white"
            />
            <button
              onClick={handleIncrease}
              className="px-2 py-0.5 bg-green-500 hover:bg-green-600 text-white text-[11px] rounded-md"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!inStock}
            className={`text-[11px] px-2 py-1 rounded-md ${
              inStock
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
          >
            🛒 Thêm
          </button>
        </div>
      </div>
    </div>
  );
};
