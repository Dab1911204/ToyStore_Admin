'use client'
import React, { useEffect, useState } from "react";
import {
  Table,
} from "../../../ui/table";

import TableHeaderOne from "../../header/TableHeaderOne";
import WarehouseTableBody from "../../body/Warehouses/WarehouseTableBody";
import { useTableContext } from "@/context/TableContext";
import Pagination from "../../Pagination";
import { NoData } from "@/components/common/NoData";
import { WarehouseService } from "@/services/warehouseService";
import { WarehouseType } from "@/schemaValidations/warehouse.schema";
import { Loading } from "@/components/common/Loading";

const title = ["STT", 'Tên sản phẩm', "Tên nhà cung cấp", "Giá nhập", "Số lượng", "Tổng giá", "Trạng thái", "Người tạo", "Người sửa", "Hành động"]

// Define the table data using the interface

export default function WarehouseTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [tableData, setTableData] = useState<WarehouseType[]>([]);
  const [loading, setLoading] = useState(true);
  const { urlApi, setParam } = useTableContext();
  const onPageChange = async (page: number) => {
    setCurrentPage(page);
    setParam("PageNumber", page);
  };
  const fetchDataTable = async (urlApi: string) => {
    try {
      setTableData([]);
      setLoading(true);
      const res = await WarehouseService.getListWarehouse(urlApi);
      setTableData(res.result.items);
      setTotalPages(res.result.totalPages);
      setCurrentPage(res.result.currentPage);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDataTable(urlApi);
  }, [urlApi]);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table className="w-full">
            {/* Table Header */}
            <TableHeaderOne title={title} />
            {/* Loading */}
            {loading && (
              <Loading colSpan={title.length} />
            )}
            {/* Có dữ liệu */}
            {!loading && tableData.length > 0 && (
              <WarehouseTableBody tableData={tableData} />
            )}
            {/* Không có dữ liệu */}
            {!loading && tableData.length === 0 && (
              <NoData colSpan={title.length} title="Không có dữ liệu" />
            )}
            
          </Table>
          {/* Phân trang */}
            {!loading && Array.isArray(tableData) && tableData.length > 0 && (
              <div className="w-full flex justify-center mt-4 mb-4">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={onPageChange}
                />
              </div>
            )}
        </div>
      </div>
    </div>

  );
}
