import { OrdersResType } from "@/schemaValidations/order.schema";
import { get } from "@/utils/request";

export const OrderService = {
  getListOrder:(url:string)=>get<OrdersResType>(url,{requireAuth:true}),
};