"use client";
import Button from "@/components/ui/button/Button";
import { useNotification } from "@/context/NotificationContext";
import { capitalizeFirstLetter, uncapitalizeFirstLetter } from "@/utils/format";
import React, { useState } from "react";
import { FaRegSmileBeam } from "react-icons/fa";

type ModalConfirmProps = {
  id: string;
  title: string;
  description?: string;
  onHandle: (id: string) => Promise<any>;
  closeModal: () => void;
  loadData?: (urlApi: string) => void;
  urlApi?: string;
};

export default function ModalConfirm({ id, title, description, onHandle, closeModal, loadData, urlApi }: ModalConfirmProps) {
  const { openNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  const description1 = capitalizeFirstLetter(description ?? "")
  const title1 = uncapitalizeFirstLetter(title ?? "")

  const handleRestore = async () => {
    try {
      setLoading(true);
      const res = await onHandle(id);
      if (res.success) {
        if (loadData && urlApi) loadData(urlApi);
        closeModal();
        openNotification({
          message: `${title} ${description} thành công`,
          description: `${description1} đã được ${title1} được.`,
          placement: "top",
          duration: 3,
          icon: <FaRegSmileBeam style={{ color: "green" }} />,
          style: { borderLeft: "5px solid green" },
        });
      } else {
        openNotification({
          message: `${title} thất bại`,
          description: `${description1} không được ${title1} được.`,
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
          {title} {description}
        </h4>

        <p className="mb-6 text-sm text-gray-800 dark:text-gray-200">
          Bạn có chắc chắn muốn <strong className="text-red-600">${title} {description}</strong> này không?
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
            {loading ? `Đang ${title1}...` : `Xác nhận ${title1}`}
          </Button>
        </div>
      </div>
    </div>
  );
}
