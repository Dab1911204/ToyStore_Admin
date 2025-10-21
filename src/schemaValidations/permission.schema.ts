import { z } from "zod";

export const UserPermissionSchema = z.object({
  id: z.string(),
  userName: z.string(),
  fullName: z.string(),
  email: z.string().email(),
  phoneNumber: z.string().nullable(),
  address: z.string().nullable(),
  localPicture: z.string().nullable(),
  gender: z.number().nullable(),
  roles: z.array(z.string()),
  lastLogin: z.string().nullable(),
  isDeleted: z.boolean(),
  createdBy: z.string(),
  createdOn: z.string(),
  updatedBy: z.string(),
  updatedOn: z.string(),
});

export const UserPermissionListResSchema = z.object({
  currentPage: z.number(),
  totalPages: z.number(),
  pageSize: z.number(),
  totalCount: z.number(),
  hasPrevious: z.boolean(),
  hasNext: z.boolean(),
  items: z.array(UserPermissionSchema),
  hasFileList: z.boolean(),
  checkList: z.number(),
  fileIds: z.array(z.string()).nullable(),
});

// ✅ TypeScript type inference
export type UserPermissionType = z.infer<typeof UserPermissionSchema>;
export type UserPermissionListResType = z.infer<typeof UserPermissionListResSchema>;