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

const title = ["STT",'Hình ảnh','Tiêu đề',"Ngày tạo","Người tạo","Người duyệt","Hàng động"]

export default function NewsTable() {
  const [currentPage,setCurrentPage] = useState(1)
    const [totalPages,setTotalPages] = useState(1)
    const [tableData,setTableData] = useState<NewsType[]>([])
    const { urlApi, setParam } = useTableContext();
    const onPageChange = (page: number) => {
      setCurrentPage(page)
      setParam("PageNumber",page)
    }
    useEffect(() => {
      const fetchDataTable = async () => {
        try {
          const res = await NewsService.getListNews(urlApi)
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
      //   const res = await fetch("https://cua-hang-do-choi-be.onrender.com/api/News/Admin",{
      //     method:"GET",
      //     headers:{
      //       "Content-Type":"application/json",
      //       "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE5ZDEwMzhkLTVmNjAtNGUyZi04MmRiLWRkYjAzNmQ3MThmOSIsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQHlvdXJhcHAubG9jYWwiLCJuYW1lIjoiU3lzdGVtIEFkbWluaXN0cmF0b3IiLCJyb2xlIjoibWFuYWdlciIsIm5iZiI6MTc1OTU2NzkwMiwiZXhwIjoxNzU5NTcxNTAyLCJpYXQiOjE3NTk1Njc5MDIsImlzcyI6Imh0dHBzOi8veW91ci1hcHAub25yZW5kZXIuY29tIiwiYXVkIjoiaHR0cHM6Ly95b3VyLWFwcC5vbnJlbmRlci5jb20ifQ.Kiu6uyYtRFpWsDJ1Ol7iLzYgrCj5bVIy2peka3v7GUU"
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
            {Array.isArray(tableData) && tableData.length > 0 ? (
              <NewsTableBody tableData={tableData} />
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
