import { useQuery } from "@tanstack/react-query";
import { ReportsApi } from "@/api/reports";
import type { ReportMetadata } from "@/types/report";

export function useReportMetadata() {
  return useQuery<ReportMetadata>({
    queryKey: ["reports", "metadata"],
    queryFn: () => ReportsApi.getMetadata().then((res) => res.data),
    staleTime: 60 * 60 * 1000, // metadata barely changes, cache for an hour
  });
}