
import { WarehousesResType } from "@/schemaValidations/warehouse.schema";
import {del, get, put} from "@/utils/request";

export const WarehouseService = {
  getListWarehouse:(url:string)=>get<WarehousesResType>(url,{requireAuth:true}),
  deleteWarehouse:(id:string)=>del<WarehousesResType>(`/api/Warehouse`,`${id}?force=true`,{requireAuth:true}),
  restoreWarehouse:(id:string)=>put<WarehousesResType>(`/api/Warehouse/restore?idwarehouse=${id}`,undefined,{requireAuth:true})
};

