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

interface Order {
  id: number;
  user: {
    image: string;
    name: string;
    role: string;
  };
  projectName: string;
  team: {
    images: string[];
  };
  status: string;
  budget: string;
}

const title = ["STT",'Hình ảnh','Tiêu đề',"Ngày tạo","Người tạo","Người duyệt","Hàng động"]

// Define the table data using the interface
const tableData: Order[] = [
  {
    id: 1,
    user: {
      image: "/images/user/user-17.jpg",
      name: "Lindsey Curtis",
      role: "Web Designer",
    },
    projectName: "Agency Website",
    team: {
      images: [
        "/images/user/user-22.jpg",
        "/images/user/user-23.jpg",
        "/images/user/user-24.jpg",
      ],
    },
    budget: "3.9K",
    status: "Active",
  },
  {
    id: 2,
    user: {
      image: "/images/user/user-18.jpg",
      name: "Kaiya George",
      role: "Project Manager",
    },
    projectName: "Technology",
    team: {
      images: ["/images/user/user-25.jpg", "/images/user/user-26.jpg"],
    },
    budget: "24.9K",
    status: "Pending",
  },
  {
    id: 3,
    user: {
      image: "/images/user/user-17.jpg",
      name: "Zain Geidt",
      role: "Content Writing",
    },
    projectName: "Blog Writing",
    team: {
      images: ["/images/user/user-27.jpg"],
    },
    budget: "12.7K",
    status: "Active",
  },
  {
    id: 4,
    user: {
      image: "/images/user/user-20.jpg",
      name: "Abram Schleifer",
      role: "Digital Marketer",
    },
    projectName: "Social Media",
    team: {
      images: [
        "/images/user/user-28.jpg",
        "/images/user/user-29.jpg",
        "/images/user/user-30.jpg",
      ],
    },
    budget: "2.8K",
    status: "Cancel",
  },
  {
    id: 5,
    user: {
      image: "/images/user/user-21.jpg",
      name: "Carla George",
      role: "Front-end Developer",
    },
    projectName: "Website",
    team: {
      images: [
        "/images/user/user-31.jpg",
        "/images/user/user-32.jpg",
        "/images/user/user-33.jpg",
      ],
    },
    budget: "4.5K",
    status: "Active",
  },
];

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
            <NewsTableBody tableData={tableData}/>
          </Table>
          <div className="w-full flex justify-center mt-4 mb-4">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
          </div>
        </div>
      </div>
    </div>
    
  );
}
