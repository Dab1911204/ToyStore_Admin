
import { SuppliersResType } from "@/schemaValidations/supplier.shema";
import { del, get, post, put } from "@/utils/request";

export const SupplierService = {
  // Lấy danh sách supplier có phân trang
  getListSupplier: (url: string) => get<SuppliersResType>(url, { requireAuth: true }),

  // Tạo mới supplier
  createSupplier: (data: any) => post<SuppliersResType>("/api/Supplier/Supplier", data, { requireAuth: true }),

  // Lấy thông tin chi tiết 1 supplier
  //infoSupplier: (id: string) => get<SupplierResType>(`/api/Supplier/${id}`, { requireAuth: true }),

  // Cập nhật supplier
  //updateSupplier: (id: string, data: any) => put<SupplierResType>(`/api/Supplier/${id}`, data, { requireAuth: true }),

  // Xóa supplier
  //deleteSupplier: (id: string) => del<SupplierDeleteResType>(`/api/Supplier`, id, { requireAuth: true }),
};
