import { get } from "@/utils/request";

export const StatisticService = {
  statistic:(url:string)=>get<any>(url,{requireAuth:true}),
};

