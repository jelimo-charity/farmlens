import { useQuery } from "@tanstack/react-query";
import { ReportsApi } from "@/api/reports";
import type { Report } from "@/types/report";

export function useReports() {
  return useQuery<Report[]>({
    queryKey: ["reports", "all"],
    queryFn: () => ReportsApi.getAll().then((res) => res.data),
  });
}