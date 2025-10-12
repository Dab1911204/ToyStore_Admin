import { z } from "zod";

// Schema cho sản phẩm trong phiếu nhập kho
export const WarehouseProductSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  price: z.number().nonnegative(),
  promotion: z
    .object({
      title: z.string(),
      discountPercent: z.number().nonnegative(),
      endDate: z.string().datetime(),
    })
    .nullable()
    .optional(),
  discountedPrice: z.number().nonnegative(),
});

// Schema cho 1 phiếu nhập kho (warehouse item)
export const WarehouseSchema = z.object({
  id: z.string().uuid(),
  productName: z.string(),
  supplierName: z.string(),
  dateEntered: z.string().datetime(),
  quantity: z.number().nonnegative(),
  price: z.number().nonnegative(),
  totalPrice: z.number().nonnegative(),
  status: z.number().int(), // Có thể đổi thành enum nếu bạn có quy ước trạng thái cụ thể
  product: WarehouseProductSchema,
  isDeleted: z.boolean(),
  createdBy: z.string(),
  createdOn: z.string().datetime(),
  updatedBy: z.string(),
  updatedOn: z.string().datetime(),
  createdbyStr: z.string(),
}).strict();

export type WarehouseType = z.infer<typeof WarehouseSchema>;

// Schema cho response có phân trang (danh sách phiếu nhập)
export const WarehousesResponseSchema = z.object({
  success: z.boolean(),
  result: z.object({
    currentPage: z.number().int(),
    totalPages: z.number().int(),
    pageSize: z.number().int(),
    totalCount: z.number().int(),
    hasPrevious: z.boolean(),
    hasNext: z.boolean(),
    items: z.array(WarehouseSchema),
    hasFileList: z.boolean().optional(),
    checkList: z.number().optional(),
    fileIds: z.array(z.string().uuid()).optional(),
  }),
  errors: z.array(z.string()),
});

export type WarehousesResType = z.infer<typeof WarehousesResponseSchema>;

// Schema cho response chi tiết 1 phiếu nhập kho
export const WarehouseResponseSchema = z.object({
  success: z.boolean(),
  result: WarehouseSchema,
  errors: z.array(z.string()),
});

export type WarehouseResType = z.infer<typeof WarehouseResponseSchema>;

// Schema cho delete/restore (DR)
export const WarehouseDRResponseSchema = z.object({
  success: z.boolean(),
  result: z.boolean(),
  errors: z.array(z.string()),
});

export type WarehouseDRResType = z.infer<typeof WarehouseDRResponseSchema>;
