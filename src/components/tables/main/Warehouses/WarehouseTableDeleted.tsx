"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
} from "../../../ui/table";

import TableHeaderOne from "../../header/TableHeaderOne";
import WarehouseTableBodyDelete from "../../body/Warehouses/WarehouseTableBodyDeleted";
import { useTableContext } from "@/context/TableContext";
import { useModal } from "@/hooks/useModal";
import { WarehouseService } from "@/services/warehouseService";
import { Loading } from "@/components/common/Loading";
import { NoData } from "@/components/common/NoData";
import Pagination from "../../Pagination";
import { WarehouseType } from "@/schemaValidations/warehouse.schema";
import { Modal } from "@/components/ui/modal";
import ModalConfirm from "@/components/example/ModalExample/ModalConfirm";


const title = ["STT", 'Tên sản phẩm', "Tên nhà cung cấp", "Giá nhập", "Số lượng", "Tổng giá", "Trạng thái", "Người xóa", "Hành động"]

// Define the table data using the interface

export default function WarehouseTableDelete() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [tableData, setTableData] = useState<WarehouseType[]>([]);
  const [loading, setLoading] = useState(true);
  const { urlApi, setParam } = useTableContext();

  // ✅ quản lý modal ở đây
  const { isOpen, openModal, closeModal } = useModal();
  const [modalType, setModalType] = useState<"delete" | "detail" | "restore" | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const onPageChange = async (page: number) => {
    setCurrentPage(page);
    setParam("PageNumber", page);
  };
  const handleOpenModal = (type: "delete" | "detail" | "restore", id?: string) => {
    setModalType(type);
    if (id) setSelectedId(id);
    openModal();
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
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[1102px]">
            <Table>
              {/* Table Header */}
              <TableHeaderOne title={title} />
              {loading && (
                <Loading colSpan={title.length} />
              )}
              {!loading && tableData.length > 0 && (
                <WarehouseTableBodyDelete
                  tableData={tableData}
                  onOpenModal={handleOpenModal} // ✅ truyền hàm mở modal xuống
                />
              )}

              {!loading && tableData.length === 0 && (
                <NoData colSpan={title.length} title="Không có dữ liệu" />
              )}
            </Table>
            {/* Pagination */}
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
      <Modal isOpen={isOpen} onClose={closeModal}>
       
        {modalType === "restore" && selectedId && (
          <>
            <ModalConfirm
              id={selectedId}
              title="Khôi phục"
              description="sản phẩm"
              onHandle={WarehouseService.restoreWarehouse}
              closeModal={closeModal}
              loadData={fetchDataTable}
              urlApi={urlApi}
            />
          </>
        )}
      </Modal>
    </>
  );
}
