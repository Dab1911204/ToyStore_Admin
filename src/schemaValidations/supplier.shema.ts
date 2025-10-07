// supplier.schema.ts
import { z } from "zod";

export const SupplierSchema = z.object({
  id: z.string().uuid(),
  supplierName: z.string(),                // ✅ trùng với API
  address: z.string(),
  phone: z.string(),
  email: z.string(),
  note: z.string().nullable().optional(),
  isDeleted: z.boolean(),
  createdBy: z.string().nullable(),
  createdOn: z.string(),                   // ❌ zod chưa có .datetime() trong stable → dùng string
  updatedBy: z.string().nullable(),
  updatedOn: z.string().nullable(),
  createdbyStr: z.string().nullable(),
  updatedbyStr: z.string().nullable()
}).strict();

export type SupplierType = z.infer<typeof SupplierSchema>;

export const SuppliersResponseSchema = z.object({
  success: z.boolean(),
  result: z.object({
    currentPage: z.number().int(),
    totalPages: z.number().int(),
    pageSize: z.number().int(),
    totalCount: z.number().int(),
    hasPrevious: z.boolean(),
    hasNext: z.boolean(),
    items: z.array(SupplierSchema),
    hasFileList: z.boolean().optional(),
    checkList: z.number().optional(),
    fileIds: z.any().nullable().optional()
  }),
  errors: z.array(z.any())
});

export type SuppliersResType = z.infer<typeof SuppliersResponseSchema>;
