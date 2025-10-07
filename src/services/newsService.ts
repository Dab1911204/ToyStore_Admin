import { NewsDetailResType, NewsResType } from "@/schemaValidations/news.schema";
import { get, post, put } from "@/utils/request";

export const NewsService = {
  getListNews: (url: string) => get<NewsResType>(url, { requireAuth: true }),
  infoNews:(id:string)=>get<NewsDetailResType>(`/api/News/${id}`,{requireAuth:true}),
  createNews: (data: any) => post<NewsResType>("/api/News/News", data, { requireAuth: true }),
  updateNews: (id: string, data: any) => put<NewsResType>(`/api/News/${id}`, data, { requireAuth: true }),
  //deleteNews:(id:string)=>del<NewsDeleteResType>(`/api/News`,id,{requireAuth:true}),
};

