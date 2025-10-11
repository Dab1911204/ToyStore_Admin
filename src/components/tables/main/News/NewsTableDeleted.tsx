"use client";
import React, { useEffect, useState } from "react";
import { Table } from "../../../ui/table";

import TableHeaderOne from "../../header/TableHeaderOne";
import NewsTableBodyDelete from "../../body/News/NewsTableBodyDeleted";
import { useTableContext } from "@/context/TableContext";
import { useModal } from "@/hooks/useModal";
import { NewsService } from "@/services/newsService";
import { Modal } from "@/components/ui/modal";
import { NewsType } from "@/schemaValidations/news.schema";
import { Loading } from "@/components/common/Loading";
import { NoData } from "@/components/common/NoData";
import Pagination from "../../Pagination";
import ModalConfirm from "@/components/example/ModalExample/ModalConfirm";

const title = ["STT", "Tiêu đề", "Tác giả", "Ngày xóa", "Người xóa", "Hành động"];

export default function NewsTableDelete() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState<NewsType[]>([]);

  const { urlApi, setParam } = useTableContext();
  const { isOpen, openModal, closeModal } = useModal();
  const [modalType, setModalType] = useState<"detail" | "restore" | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // ✅ Khi chuyển trang
  const onPageChange = async (page: number) => {
    setCurrentPage(page);
    setParam("PageNumber", page);
  };

  // ✅ Mở modal (chi tiết hoặc khôi phục)
  const handleOpenModal = (type: "detail" | "restore", id?: string) => {
    setModalType(type);
    if (id) setSelectedId(id);
    openModal();
  };

  // ✅ Gọi API lấy danh sách tin tức đã xóa
  const fetchDataTable = async (urlApi: string) => {
    try {
      setLoading(true);
      setTableData([]);

      const res = await NewsService.getListNews(urlApi);
      if (res.success) {
        setTableData(res.result.items);
        setTotalPages(res.result.totalPages);
        setCurrentPage(res.result.currentPage);
      }
    } catch (error) {
      console.log(error);
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
              {/* Header */}
              <TableHeaderOne title={title} />

              {/* Loading */}
              {loading && <Loading colSpan={title.length} />}

              {/* Có dữ liệu */}
              {!loading && tableData.length > 0 && (
                <NewsTableBodyDelete
                  tableData={tableData}
                  onOpenModal={handleOpenModal}
                />
              )}

              {/* Không có dữ liệu */}
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

      {/* ✅ Modal */}
      <Modal isOpen={isOpen} onClose={closeModal}>
        {modalType === "detail" && selectedId && (
          <>
            {/* 👉 chỗ này bạn có thể thêm component chi tiết tin tức */}
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3">Chi tiết tin tức</h3>
              <p>Hiển thị nội dung chi tiết của tin có ID: {selectedId}</p>
            </div>
          </>
        )}

        {/* {modalType === "restore" && selectedId && (
          <ModalConfirm
            id={selectedId}
            title="Khôi phục"
            description="tin tức"
            onHandle={NewsService.restoreNews}
            closeModal={closeModal}
            loadData={fetchDataTable}
            urlApi={urlApi}
          />
        )} */}
      </Modal>
    </>
  );
}
