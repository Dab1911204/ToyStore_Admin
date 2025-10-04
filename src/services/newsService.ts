import { NewsResType } from "@/schemaValidations/news.schema";
import { get } from "@/utils/request";

export const NewsService = {
  getListNews: (url: string) => get<NewsResType>(url, { requireAuth: true })
};
