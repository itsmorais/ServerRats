// utils/dateRange.ts
export function getStartDateFromRange(range: string): Date | undefined {
    const now = new Date();
    switch (range) {
      case "weekly":
        return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
      case "monthly":
        return new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
      case "yearly":
        return new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
      case "all":
      default:
        return undefined;
    }
  }
  