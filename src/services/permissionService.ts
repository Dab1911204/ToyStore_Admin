import { UserPermissionListResType } from "@/schemaValidations/permission.schema";
import { get } from "@/utils/request";

export const PermissionService = {
  getUserListPermission:(url:string)=>get<UserPermissionListResType>(url,{requireAuth:true}),
};

