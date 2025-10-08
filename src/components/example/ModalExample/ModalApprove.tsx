"use client";
import Button from "@/components/ui/button/Button";
import { useNotification } from "@/context/NotificationContext";
import { capitalizeFirstLetter } from "@/utils/format";
import React, { useState } from "react";
import { FaRegSmileBeam } from "react-icons/fa";

type ModalApproveProps = {
  id: string;
  title: string;
  description?: string;
  onRestore: (id: string) => Promise<any>;
  closeModal: () => void;
  loadData?: (urlApi: string) => void;
  urlApi?: string;
};

export default function ModelRestore({ id, title, description, onRestore, closeModal, loadData, urlApi }: ModalApproveProps) {
  const { openNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  const description1 = capitalizeFirstLetter(description ?? "")

  const handleRestore = async () => {
    try {
      setLoading(true);
      const res = await onRestore(id);
      if (res.success) {
        if (loadData && urlApi) loadData(urlApi);
        closeModal();
        openNotification({
          message: `Khôi phục ${description1} thành công`,
          description: "Khuyến mãi đã được khôi phục lại hệ thống.",
          placement: "top",
          duration: 3,
          icon: <FaRegSmileBeam style={{ color: "green" }} />,
          style: { borderLeft: "5px solid green" },
        });
      } else {
        openNotification({
          message: `Khôi phục ${description1} thất bại`,
          description: `${description1} không được khôi phục lại hệ thống.`,
          placement: "top",
          duration: 3,
          icon: <FaRegSmileBeam style={{ color: "red" }} />,
          style: { borderLeft: "5px solid red" },
        });
      }
    } catch (error) {
      console.error("Lỗi khi khôi phục:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-[450px] rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-900">
        <h4 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">
          {title}
        </h4>

        <p className="mb-6 text-sm text-gray-800 dark:text-gray-200">
          Bạn có chắc chắn muốn <strong className="text-red-600">khôi phục {description}</strong> này không?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={closeModal}
            disabled={loading}
            className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Hủy
          </button>
          <Button
            onClick={handleRestore}
            disabled={loading}
            size="sm"
            variant="warning"
          >
            {loading ? "Đang khôi phục..." : "Xác nhận khôi phục"}
          </Button>
        </div>
      </div>
    </div>
  );
}
