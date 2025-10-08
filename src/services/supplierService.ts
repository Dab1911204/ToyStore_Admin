
import { SupplierResType, SuppliersResType } from "@/schemaValidations/supplier.shema";
import { get, post, put } from "@/utils/request";

export const SupplierService = {
  // Lấy danh sách supplier có phân trang
  getListSupplier: (url: string) => get<SuppliersResType>(url, { requireAuth: true }),

  // Cập nhật supplier
  updateSupplier: (id: string, data: any) => put<SupplierResType>(`/api/Supplier/${id}`, data, { requireAuth: true }),

  // Xóa supplier
  //deleteSupplier: (id: string) => del<SupplierDeleteResType>(`/api/Supplier`, id, { requireAuth: true }),
};
