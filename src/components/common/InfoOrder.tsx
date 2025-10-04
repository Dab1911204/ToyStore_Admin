"use client";

import { OrderItem } from "./OrderItem";

export const InfoOrder = () => {
  return (
    <>
      <div className="flex w-full flex-col">
        <div className="flex flex-col">
          <OrderItem/>
        </div>
      </div>
    </>
  )
};
