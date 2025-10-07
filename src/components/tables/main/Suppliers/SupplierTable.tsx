"use client";
import React, { useEffect, useState } from "react";
import { Table } from "../../../ui/table";

import TableHeaderOne from "../../header/TableHeaderOne";
import SupplierTableBody from "../../body/Suppliers/SupplierTableBody";
import { useTableContext } from "@/context/TableContext";
import Pagination from "../../Pagination";
import { Loading } from "@/components/common/Loading";
import { NoData } from "@/components/common/NoData";
import { useModal } from "@/hooks/useModal";
import { SupplierService } from "@/services/supplierService";

// kiểu dữ liệu supplier
interface SupplierType {
  id: string;
  supplierName: string;   // đúng với API trả về
  phone: string;
  email: string;
  address: string;
  note?: string | null;
}



const title = [
  "STT",
  "Tên nhà cung cấp",
  "SĐT",
  "Email",
  "Địa chỉ",
  "Ghi chú",
  "Hành động",
];

export default function SupplierTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [tableData, setTableData] = useState<SupplierType[]>([]);
  const [loading, setLoading] = useState(true);

  const { urlApi, setParam } = useTableContext();

  // modal
  const { isOpen, openModal, closeModal } = useModal();
  const [modalType, setModalType] = useState<"delete" | "detail" | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const onPageChange = async (page: number) => {
    setCurrentPage(page);
    setParam("PageNumber", page);
  };

  const handleOpenModal = (type: "delete" | "detail", id?: string) => {
    setModalType(type);
    if (id) setSelectedId(id);
    openModal();
  };

  useEffect(() => {
    const fetchDataTable = async () => {
      try {
        setLoading(true);
        setTableData([]);
        const res = await SupplierService.getListSupplier(urlApi);
        setTableData(res.result.items);
        setTotalPages(res.result.totalPages);
        setCurrentPage(res.result.currentPage);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDataTable();
  }, [urlApi]);

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[1102px]">
            <Table className="w-full">
              {/* Table Header */}
              <TableHeaderOne title={title} />

              {/* Table Body */}
              {loading && <Loading colSpan={title.length} />}

              {!loading && tableData.length > 0 && (
                <SupplierTableBody
                  tableData={tableData}
                  onOpenModal={handleOpenModal}
                />
              )}

              {!loading && tableData.length === 0 && (
                <NoData colSpan={title.length} title="Không có dữ liệu" />
              )}
            </Table>

            {/* Pagination */}
            {!loading && tableData.length > 0 && (
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

      {/* Modal */}
      {/* <Modal isOpen={isOpen} onClose={closeModal}>
        {modalType === "delete" && selectedId && (
          <ModelDelete
            id={selectedId}
            title="Xóa nhà cung cấp"
            description="nhà cung cấp"
            onDelete={SupplierService.deleteSupplier}
            closeModal={closeModal}
          />
        )}
      </Modal> */}
    </>
  );
}
