import { ProductResType } from "@/schemaValidations/product.schema";
import {get} from "@/utils/request";

export const ProductService = {
  getListProduct:(url:string)=>get<ProductResType>(url,{requireAuth:true})
};

