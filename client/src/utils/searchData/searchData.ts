import { INotes } from "@/types/types";

export function searchData(
  data: INotes,
  query: string,
  exceptions?: string[]
): boolean {
  if (!query) return true
  const lowerCaseQuery = query.toLowerCase();
  for (let [key, value] of Object.entries(data)) {
    if (!exceptions || !exceptions.includes(key)) {
      if (value && value.toLowerCase().includes(lowerCaseQuery)) {
        return true;
      }
    }
  }
  return false;
}
