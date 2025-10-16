"use client";
import { ProductType } from "@/schemaValidations/product.schema";
import Image from "next/image";
import { useState } from "react";

export const ProductItemWarehouse = ({ item }: { item: ProductType }) => {
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState<number>(0);
  const inStock = true;

  const handleIncrease = () => setQuantity(quantity + 1);

  const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (val >= 0) setQuantity(val);
  };

  const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (val >= 0) setPrice(val);
  };

  const handleAddToCart = () => {
    alert(`Đã thêm ${quantity} sản phẩm, giá nhập ${price.toLocaleString()}đ`);
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
            {item.productName}
          </span>
          <span className="text-[11px] text-gray-500 block">
            Nhà cung cấp: {item.supplier.name}
          </span>

          {/* Ô nhập giá */}
          <div className="mt-2 flex items-center justify-between">
            <span className="text-[11px] text-gray-600 dark:text-gray-300">
              Giá nhập:
            </span>
            <div className="flex items-center gap-1">
              <input
                type="number"
                value={price}
                onChange={handleChangePrice}
                className="w-25 border border-gray-300 rounded-md text-center text-[11px] py-0.5 dark:bg-gray-700 dark:text-white"
              />
              <span className="text-[11px] text-gray-600 dark:text-gray-300">
                đ
              </span>
            </div>
          </div>
        </div>

        {/* Số lượng + Giỏ hàng */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1">
            <span className="text-[11px] text-gray-600 dark:text-gray-300">
              Số lượng:
            </span>
            <input
              type="number"
              value={quantity}
              onChange={handleChangeQuantity}
              className="w-10 border border-gray-300 rounded-md text-center text-[11px] py-0.5 dark:bg-gray-700 dark:text-white"
            />
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
