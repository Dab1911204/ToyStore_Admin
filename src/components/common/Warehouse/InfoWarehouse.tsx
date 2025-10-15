"use client";

import Button from "../../ui/button/Button";
import { WarehouseItem } from "./WarehouseItem";

type WarehouseItemProps = {
  image?: string;
  productName: string;
  supplierName: string;
  quantity: number;
  price: number;
}
type InfoWarehouse = {
  data: WarehouseItemProps[];
}

const data = [
  {
    image: "/images/user/owner.jpg",
    productName: "Sản phẩm 1",
    supplierName: "Nhà cung cấp 1",
    quantity: 2,
    price: 300000
  },
  {
    image: "/images/user/owner.jpg",
    productName: "Sản phẩm 2",
    supplierName: "Nhà cung cấp 2",
    quantity: 1,
    price: 250000
  }
]
export const InfoWarehouse = () => {
  const totalPrice = data.reduce((total, item) => total + item.price * item.quantity, 0); // ví dụ tổng tiền đơn hàng
  return (
    <>
      <div className="flex flex-col space-y-3">
        {data.length > 0 && data ? data.map((item, index) => (
          <WarehouseItem 
            key={index}
            image={item.image}
            productName={item.productName}
            supplierName={item.supplierName}
            quantity={item.quantity}
            price={item.price}
          />
        )) : (
          <>
            <p>Vui lòng chọn sản phẩm</p>
          </>
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
          Nhập kho
        </Button>
      </div>
    </>
  );
};
