"use client"
import { Table } from "@/components/ui/table";
import React, { useEffect, useState } from "react";
import TableHeaderOne from "../../header/TableHeaderOne";
import EmployeesBody from "../../body/Employees/EmployeesBody";
import { UserPermissionType } from "@/schemaValidations/permission.schema";
import { useTableContext } from "@/context/TableContext";
import { useModal } from "@/hooks/useModal";
import { PermissionService } from "@/services/permissionService";
import { NoData } from "@/components/common/NoData";
import { Loading } from "@/components/common/Loading";
import Pagination from "../../Pagination";
import { Modal } from "@/components/ui/modal";

const title = ["STT", 'Tên nhân viên', 'số điện thoại', 'Email', "Vai trò", "Ngày thuê", "Trạng thái", "Người thêm", "Người sửa", "Hành động"]

export default function EmployeesTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [tableData, setTableData] = useState<UserPermissionType[]>([]);
    const [loading, setLoading] = useState(true);
    const { urlApi, setParam } = useTableContext();

    // ✅ quản lý modal
    const { isOpen, openModal, closeModal } = useModal();
    const [modalType, setModalType] = useState<"delete" | "detail" | null>(null);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    // đổi trang
    const onPageChange = (page: number) => {
        setCurrentPage(page);
        setParam("PageNumber", page);
    };

    // mở modal
    const handleOpenModal = (type: "delete" | "detail", id?: string) => {
        setModalType(type);
        if (id) setSelectedId(id);
        openModal();
    };

    // load data
    const fetchDataTable = async (urlApi: string) => {
        try {
            setTableData([]);
            setLoading(true);
            const res = await PermissionService.getUserListPermission(urlApi);
            setTableData(res.items);
            setTotalPages(res.totalPages);
            setCurrentPage(res.currentPage);
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
        <div>
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                <div className="max-w-full overflow-x-auto">
                    <div className="min-w-[1102px]">
                        <Table className="w-full">
                            {/* Table Header */}
                            <TableHeaderOne title={title} />

                            {/* Body */}
                            {loading && <Loading colSpan={title.length} />}
                            {!loading && tableData.length > 0 && (
                                <EmployeesBody
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
            {/* ✅ Modal */}
            <Modal isOpen={isOpen} onClose={closeModal}>
                {modalType === "delete" && selectedId && (
                    <></>
                )}
                {modalType === "detail" && selectedId && (
                    <></>
                )}
            </Modal>
        </div>
    );
}