
import {WarehouseResType} from "@/schemaValidations/warehouse.schema";
import {get, post} from "@/utils/request";

export const WarehouseService = {
  getListWarehouse:(url:string)=>get<WarehouseResType>(url,{requireAuth:true}),
  createWarehouse:(data:any)=>post<WarehouseResType>('/api/Warehouse',data,{requireAuth:true}),
}

