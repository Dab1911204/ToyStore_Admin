"use client";

import Button from "../../ui/button/Button";
import { OrderItem } from "./OrderItem";

export const InfoOrder = () => {
  const totalPrice = 500000; // ví dụ tổng tiền đơn hàng

  return (
    <>
      <div className="flex flex-col space-y-3">
        <OrderItem />
        <OrderItem />
      </div>
      <div className="flex flex-col items-end mt-5 border-t border-gray-200 dark:border-gray-700 pt-4">
        <div className="flex items-center justify-between w-full mb-3">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Tổng tiền:
          </p>
          <p className="text-base font-semibold text-red-600">
            {totalPrice.toLocaleString()}đ
          </p>
        </div>

        <Button
          variant="primary"
          className="w-full"
          size="md"
          onClick={() => alert("Thanh toán thành công!")}
        >
          Thanh toán
        </Button>
      </div>
    </>
  );
};
