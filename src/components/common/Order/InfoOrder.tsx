"use client";

import { useOrder } from "@/context/OrderContext";
import Button from "../../ui/button/Button";
import { OrderItem } from "./OrderItem";
import { NoData } from "../NoData";

export const InfoOrder = () => {
  const { cart, totalPrice, removeFromCart } = useOrder();

  return (
    <>
      <div className="flex flex-col space-y-3">
        {cart.length > 0 ? (
          cart.map((item) => (
            <OrderItem
              key={item.product.id}
              name={item.product.productName}
              supplier={item.product.supplier?.name ?? "Không rõ"}
              image={item.product.image?.[0] ?? "/images/no-image.png"}
              price={item.product.price}
              discountPrice={item.product.promotion ?? item.product.price}
              quantity={item.quantity}
              onRemove={() => removeFromCart(item.product.id)}
            />
          ))
        ) : (
          <NoData title="Chưa có sản phẩm nào trong đơn hàng" />
        )}
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
