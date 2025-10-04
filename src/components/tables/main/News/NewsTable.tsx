'use client'
import React, { useEffect, useState } from "react";
import {
  Table,
} from "../../../ui/table";

import TableHeaderOne from "../../header/TableHeaderOne";
import NewsTableBody from "../../body/News/NewsTableBody";
import Pagination from "../../Pagination";
import { useTableContext } from "@/context/TableContext";
import { NewsService } from "@/services/newsService";
import { NewsType } from "@/schemaValidations/news.schema";
import { Loading } from "@/components/common/Loading";
import { NoData } from "@/components/common/NoData";

const title = ["STT",'Hình ảnh','Tiêu đề',"Ngày tạo","Người tạo","Người duyệt","Hàng động"]

export default function NewsTable() {
  const [currentPage,setCurrentPage] = useState(1)
    const [totalPages,setTotalPages] = useState(1)
    const [tableData,setTableData] = useState<NewsType[]>([])
    const [loading, setLoading] = useState(true); // trạng thái đang load
    const { urlApi, setParam } = useTableContext();
    const onPageChange = (page: number) => {
      setCurrentPage(page)
      setParam("PageNumber",page)
    }
    useEffect(() => {
      const fetchDataTable = async () => {
        try {
          setLoading(true)
          setTableData([])
          const res = await NewsService.getListNews(urlApi)
          console.log(res)
          setTableData(res.result.items)
          setTotalPages(res.result.totalPages)
          setCurrentPage(res.result.currentPage)
        }
        catch (error) {
          console.log(error)
        }finally{
          setLoading(false)
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
            {loading && (
              <Loading colSpan={title.length} />
            )}
            {!loading && Array.isArray(tableData) && tableData.length > 0 && (
              <NewsTableBody tableData={tableData} />
            )}
            {!loading && tableData.length === 0 && (
              <NoData colSpan={title.length} title="Không có dữ liệu" />
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
