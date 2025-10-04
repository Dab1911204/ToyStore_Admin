'use client'
import React, { useEffect, useState } from "react";
import {
  Table,
} from "../../../ui/table";

import TableHeaderOne from "../../header/TableHeaderOne";
import ProductTableBody from "../../body/Products/ProductTableBody";
import Pagination from "../../Pagination";
import { ProductType } from "@/schemaValidations/product.schema";
import { useTableContext } from "@/context/TableContext";
import { ProductService } from "@/services/productService";


const title = ["STT",'Hình ảnh','Tên sản phẩm',"Giá","Số lượng","Trạng thái","Tình trạng","Người tạo","Người sửa","Hành động"]

export default function ProductTable() {
  const [currentPage,setCurrentPage] = useState(1)
  const [totalPages,setTotalPages] = useState(1)
  const [tableData,setTableData] = useState<ProductType[]>([])
  const { urlApi, setParam } = useTableContext();
  const onPageChange = (page: number) => {
    setCurrentPage(page)
    setParam("PageNumber",page)
  }
  useEffect(() => {
    const fetchDataTable = async () => {
      try {
        const res = await ProductService.getListProduct(urlApi)
        console.log(res)
        setTableData(res.result.items)
        setTotalPages(res.result.totalPages)
        setCurrentPage(res.result.currentPage)
      }
      catch (error) {
        console.log(error)
      }
    }
    fetchDataTable()
    // const fetchDataTable1= async () => {
    //   const res = await fetch("https://cua-hang-do-choi-be.onrender.com/api/Product/admin",{
    //     method:"GET",
    //     headers:{
    //       "Content-Type":"application/json",
    //       "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE5ZDEwMzhkLTVmNjAtNGUyZi04MmRiLWRkYjAzNmQ3MThmOSIsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQHlvdXJhcHAubG9jYWwiLCJuYW1lIjoiU3lzdGVtIEFkbWluaXN0cmF0b3IiLCJyb2xlIjoibWFuYWdlciIsIm5iZiI6MTc1OTQ3NTY0MCwiZXhwIjoxNzU5NDc5MjQwLCJpYXQiOjE3NTk0NzU2NDAsImlzcyI6Imh0dHBzOi8veW91ci1hcHAub25yZW5kZXIuY29tIiwiYXVkIjoiaHR0cHM6Ly95b3VyLWFwcC5vbnJlbmRlci5jb20ifQ.T9qn4Eqi4PN3h66AB2PcnkX_jELvlSicgnJxouLrzDk"
    //     }
    //   })
    //   const data = await res.json()
    //   console.log(data)
    // }
    // fetchDataTable1()
  }, [urlApi])

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table className="w-full">
            {/* Table Header */}
            <TableHeaderOne title={title}/>

            {/* Table Body */}
            <ProductTableBody tableData={tableData}/>
          </Table>
          <div className="w-full flex justify-center mt-4 mb-4">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
          </div>
        </div>
      </div>
    </div>   
  );
}
