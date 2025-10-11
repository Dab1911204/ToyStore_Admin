import { CategoriesResType } from "@/schemaValidations/category.schema";
import { get } from "@/utils/request";

export const CategoryService = {
  getListCategory:(url:string)=>get<CategoriesResType>(url,{requireAuth:true}),
  //createCategory:(data:any)=>post<CategoryResType>("/api/Category",data,{requireAuth:true}),
  //infoCategory:(id:string)=>get<CategoryResType>(`/api/Category/${id}`,{requireAuth:true}),
  //updateCategory:(id:string,data:any)=>put<CategoryResType>(`/api/Category/${id}`,data,{requireAuth:true}),
  //deleteCategory:(id:string)=>del<CategoryDRResType>(`/api/Category`,id,{requireAuth:true}),
  //restoreCategory:(id:string)=>put<CategoryDRResType>(`/api/Category/restore/${id}`,undefined,{requireAuth:true}),
};

