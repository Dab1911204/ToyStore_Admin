
import { WarehouseResType, WarehousesResType } from "@/schemaValidations/warehouse.schema";
import {del, get, post, put} from "@/utils/request";

export const WarehouseService = {
  getListWarehouse:(url:string)=>get<WarehousesResType>(url,{requireAuth:true}),
  createWarehouse:(data:any)=>post<WarehousesResType>('/api/Warehouse/Warehouse',data,{requireAuth:true}),
  infoWarehouse:(id:string)=>get<WarehouseResType>(`/api/Warehouse/${id}`,{requireAuth:true}),
  updateWarehouse:(id:string,data:any)=>put<WarehousesResType>(`/api/Warehouse/${id}`,data,{requireAuth:true}),
  deleteWarehouse:(id:string)=>del<WarehousesResType>(`/api/Warehouse`,`${id}?force=true`,{requireAuth:true}),
  restoreWarehouse:(id:string)=>put<WarehousesResType>(`/api/Warehouse/restore?idwarehouse=${id}`,undefined,{requireAuth:true})
};

