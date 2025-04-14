// use-cases/GetGroupDetailUseCase.ts

import { GetGroupDetailDTO } from "@/repositories/DTOS/GetGroupDetailDTO";
import { GroupsRepository } from "@/repositories/GroupRepository";
import { StudyLogRepository } from "@/repositories/StudyLogRepository";
import { computeLeaderboard } from "@/services/LeaderboardService";


export class GetGroupDetailUseCase {
    constructor(
        private groupRepository: GroupsRepository,
        private studyLogRepository: StudyLogRepository
    ) { }

    async execute({ groupId }: GetGroupDetailDTO) {
        const group = await this.groupRepository.findById(Number(groupId));
        if (!group) throw new Error("Grupo não encontrado");

        const members = await this.groupRepository.getGroupMembers(Number(groupId));
        const logs = await this.studyLogRepository.findManyByGroupId(Number(groupId));
        const leaderboardLogs = await this.groupRepository.getLeaderboard(groupId);
        const leaderBoard = computeLeaderboard(leaderboardLogs);

        return {
            group: {
                id: group.id,
                name: group.name,
                description: group.description,
                imageSrc: group.imageSrc,
                groupCode: group.groupCode,
                isPublic: group.isPublic,
                startDate: group.startDate,
                endDate: group.endDate,
                owner: {
                    id: group.ownerId,
                    name: group.owner.name,
                }
            },
            members: members.map(m => ({
                id: m.id,
                name: m.name,
                avatarUrl: m.avatarUrl
            })),
            feed: logs.map(log => ({
                id: log.id,
                user: {
                    id: log.user.id,
                    name: log.user.name,
                    avatarUrl: log.user.avatarUrl
                },
                title: log.title,
                note: log.note,
                imageUrl: log.imageUrl,
                studiedAt: log.studiedAt
            })),
            leaderboard: leaderBoard.map((entry, index) => ({
                ...entry,
                position: index + 1
            }))
        };
    }
}
