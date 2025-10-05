import { NewsResType } from "@/schemaValidations/news.schema";
import { get, post } from "@/utils/request";

export const NewsService = {
  getListNews: (url: string) => get<NewsResType>(url, { requireAuth: true }),

  createNews: (data: any) =>
    post<NewsResType>("/api/News/News", data, { requireAuth: true }),
};

