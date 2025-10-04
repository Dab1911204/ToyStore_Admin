"use client";

import Image from "next/image";

export const OrderItem = () => {
  return (
    <>
      <div className="flex">
        <div className="w-15 h-15 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
            <Image
            width={80}
            height={80}
            src="/images/user/owner.jpg"
            alt="user"
            />
        </div>
        <div className="flex flex-col ml-2 justify-center">
            <h3 className="mb-2 text-sm font-semibold text-gray-800 dark:text-white/90">Sản phẩm 1</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Nhà cung cấp 1</p>
        </div>
        <div className="flex flex-col ml-2 justify-end">
            <p></p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Nhà cung cấp 1</p>
        </div>
      </div>
    </>
  )
};
