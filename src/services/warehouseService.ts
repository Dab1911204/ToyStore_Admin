
import { WarehousesResType } from "@/schemaValidations/warehouse.schema";
import {del, get} from "@/utils/request";

export const WarehouseService = {
  getListWarehouse:(url:string)=>get<WarehousesResType>(url,{requireAuth:true}),
  deleteWarehouse:(id:string)=>del<WarehousesResType>(`/api/Warehouse`,`${id}?force=true`,{requireAuth:true}),
};

