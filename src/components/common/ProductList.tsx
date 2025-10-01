"use client";

import { ProductItem } from "./ProductItem";


export const ProductList = () => {
  return(
    <>
        <div className="grid grid-cols-4 gap-4">
            <ProductItem/>
        </div>
    </>
  )
};
