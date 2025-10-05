import { PromotionResType } from "@/schemaValidations/promotion.schema";
import {get, post} from "@/utils/request";

export const PromotionService = {
  getListPromotion:(url:string)=>get<PromotionResType>(url,{requireAuth:true}),
  createPromotion:(data:any)=>post<PromotionResType>("/api/Promotion",data,{requireAuth:true})
};

