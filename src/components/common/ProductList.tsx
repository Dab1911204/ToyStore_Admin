"use client";

import Pagination from "../tables/Pagination";
import { ProductItem } from "./ProductItem";


export const ProductList = () => {
  return(
    <>
        <div className="grid grid-cols-3 gap-3 justify-items-center">
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
        </div>
        <div className="w-full flex justify-center mt-4 mb-4">
          <Pagination currentPage={1} totalPages={3} onPageChange={(e) => {console.log(e)}} />
        </div>
    </>
  )
};
