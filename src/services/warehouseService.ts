
import { WarehousesResType } from "@/schemaValidations/warehouse.schema";
import {del, get, post, put} from "@/utils/request";

export const WarehouseService = {
  getListWarehouse:(url:string)=>get<WarehousesResType>(url,{requireAuth:true}),
};

