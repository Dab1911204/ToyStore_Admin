import { PromotionResType } from "@/schemaValidations/promotion.schema";
import {get} from "@/utils/request";

export const PromotionService = {
  getListPromotion:(url:string)=>get<PromotionResType>(url,{requireAuth:true})
};

