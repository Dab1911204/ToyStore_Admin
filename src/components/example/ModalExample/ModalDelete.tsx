"use client";
import React, { useState } from "react";

type ModelDeleteProps = {
  id: string;
  title: string;
  description?: string;
  onDelete: (id: string) => Promise<any>;
  closeModal: () => void;
};

export default function ModelDelete({ id, title, description, onDelete, closeModal}: ModelDeleteProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await onDelete(id);
      if (res.success){
        alert("Xóa thành công!");
        closeModal();
      } else {
        alert("Đã xảy ra lỗi khi xóa!");
      }
    } catch (error) {
      console.error("Lỗi khi xóa:", error);
      alert("Đã xảy ra lỗi khi xóa!");
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
