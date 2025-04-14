import { GetLeaderboardDTO } from "@/repositories/DTO/GetLeaderboardDTO";
import { GroupsRepository } from "@/repositories/GroupRepository";
import { getStartDateFromRange } from "@/utils/dateRange";




export class GetLeaderboardUseCase {
    constructor(private groupRepository: GroupsRepository) { }

    async execute({ groupId, range }: GetLeaderboardDTO) {
        const startDate = getStartDateFromRange(range);
        const logs = await this.groupRepository.getLeaderboard(groupId, startDate)

        const leaderboardMap = new Map<string, {
            name: string;
            avatarUrl?: string | null;
            daysSet: Set<string>;
            lastStudiedAt: Date;
        }>();

        logs.forEach(log => {
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

        const leaderboard = Array.from(leaderboardMap.entries())
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

        return {
            range,
            generatedAt: new Date(),
            leaderboard,
        };




    }
}