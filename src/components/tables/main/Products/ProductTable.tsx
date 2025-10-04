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
  const onPageChange = async (page: number) => {
    setCurrentPage(page)
    setParam("PageNumber",page)
  }
  useEffect(() => {
    console.log(urlApi)
    const fetchDataTable = async () => {
      try {
        const res = await ProductService.getListProduct(urlApi)
        setTableData(res.result.items)
        setTotalPages(res.result.totalPages)
        setCurrentPage(res.result.currentPage)
      }
      catch (error) {
        console.log(error)
      }
    }
    fetchDataTable()
  }, [urlApi])

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table className="w-full">
            {/* Table Header */}
            <TableHeaderOne title={title}/>

            {/* Table Body */}
            {Array.isArray(tableData) && tableData.length > 0 ? (
              <ProductTableBody tableData={tableData} />
            ) : (
              <tbody>
                <tr>
                  <td
                    colSpan={title.length}
                    className="px-4 py-3 text-gray-500 text-center text-theme-lg"
                  >
                    Không có dữ liệu
                  </td>
                </tr>
              </tbody>
            )}
          </Table>
          {Array.isArray(tableData) && tableData.length > 0 && (
            <div className="w-full flex justify-center mt-4 mb-4">
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
            </div>
          )}
        </div>
      </div>
    </div>
    
  );
}
