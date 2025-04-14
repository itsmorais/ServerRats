import { LeaderboardEntry } from "@/repositories/GroupRepository";

type ComputedLeaderboardEntry = {
  userId: string;
  name: string;
  avatarUrl?: string | null;
  daysActive: number;
  lastStudiedAt: Date;
  position: number;
};

export function computeLeaderboard(entries: LeaderboardEntry[]): ComputedLeaderboardEntry[] {
  const leaderboardMap = new Map<
    string,
    {
      name: string;
      avatarUrl?: string | null;
      daysSet: Set<string>;
      lastStudiedAt: Date;
    }
  >();

  entries.forEach((log) => {
    const dateKey = log.studiedAt.toISOString().split("T")[0];

    if (!leaderboardMap.has(log.userId)) {
      leaderboardMap.set(log.userId, {
        name: log.name,
        avatarUrl: log.avatarUrl,
        daysSet: new Set([dateKey]),
        lastStudiedAt: log.studiedAt,
      });
    } else {
      const entry = leaderboardMap.get(log.userId)!;
      entry.daysSet.add(dateKey);
      if (log.studiedAt > entry.lastStudiedAt) {
        entry.lastStudiedAt = log.studiedAt;
      }
    }
  });

  return Array.from(leaderboardMap.entries())
    .map(([userId, data]) => ({
      userId,
      name: data.name,
      avatarUrl: data.avatarUrl,
      daysActive: data.daysSet.size,
      lastStudiedAt: data.lastStudiedAt,
    }))
    .sort((a, b) => b.daysActive - a.daysActive)
    .map((entry, index) => ({
      ...entry,
      position: index + 1,
    }));
}
