"use client";
import { useNotification } from "@/context/NotificationContext";
import React, { useState } from "react";
import { FaRegSmileBeam } from "react-icons/fa";

type ModelDeleteProps = {
  id: string;
  title: string;
  description?: string;
  onDelete: (id: string) => Promise<any>;
  closeModal: () => void;
};

export default function ModelDelete({ id, title, description, onDelete, closeModal }: ModelDeleteProps) {
  const { openNotification } = useNotification();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await onDelete(id);
      if (res.success){
        closeModal();
        openNotification({
          message: "Xóa khuyến mãi thành công",
          description: "Khuyến mãi đã được xóa khỏi hệ thống.",
          placement: "top",
          duration: 3,
          icon: <FaRegSmileBeam style={{ color: "green" }} />,
          style: { borderLeft: "5px solid green" },
        });
      } else {
        openNotification({
          message: "Xóa khuyến mãi thất bại",
          description: "Khuyến mãi không được xóa khỏi hệ thống.",
          placement: "top",
          duration: 3,
          icon: <FaRegSmileBeam style={{ color: "red" }} />,
          style: { borderLeft: "5px solid red" },
        });
      }
    } catch (error) {
      console.error("Lỗi khi xóa:", error);
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
          Bạn có chắc chắn muốn <strong className="text-red-600">xóa {description}</strong> này không?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={closeModal}
            disabled={loading}
            className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Hủy
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-70"
          >
            {loading ? "Đang xóa..." : "Xác nhận xóa"}
          </button>
        </div>
      </div>
    </div>
  );
}
