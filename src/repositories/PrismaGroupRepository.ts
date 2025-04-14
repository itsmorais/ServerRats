import { Prisma, Group } from "@prisma/client";
import { PrismaDatabase } from "@/database/PrismaDatabase";
import { GroupMemberEntry, GroupsRepository, LeaderboardEntry } from "./GroupRepository";
import { GroupWithOwner } from "./DTOS/GroupWithOwner";

export class PrismaGroupsRepository implements GroupsRepository {

    private prisma = PrismaDatabase.getInstance().getClient();


    create(data: Prisma.GroupCreateInput): Promise<Group> {
        return this.prisma.group.create({ data });
    }

    findByGroupCode(code: string): Promise<Group | null> {
        return this.prisma.group.findUnique({
            where: {
                groupCode: code
            }
        });
    }

    findById(id: number): Promise<GroupWithOwner | null> {
        return this.prisma.group.findUnique({
            where: {
                id: id
            },
            include: { owner: { select: { id: true, name: true } } }
        })
    };



    async getLeaderboard(groupId: string, startDate?: Date): Promise<LeaderboardEntry[]> {
        const studyLogGroups = await this.prisma.studyLogGroup.findMany({
            where: {
                groupId: Number(groupId),
                ...(startDate && {
                    studyLog: {
                        studiedAt: {
                            gte: startDate,
                        },
                    },
                }),
            },
            select: {
                studyLog: {
                    select: {
                        studiedAt: true,
                        userId: true,
                        user: {
                            select: {
                                name: true,
                                avatarUrl: true,
                            },
                        },
                    },
                },
            },
        });

        return studyLogGroups.map(slg => ({
            userId: slg.studyLog.userId,
            name: slg.studyLog.user.name,
            avatarUrl: slg.studyLog.user.avatarUrl,
            studiedAt: slg.studyLog.studiedAt,
        }));
    }

    async getGroupMembers(groupId: number): Promise<GroupMemberEntry[]> {
        const memberships = await this.prisma.groupMembership.findMany({
            where: { groupId },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        avatarUrl: true,
                    }
                }
            }
        });

        return memberships.map(m => ({
            id: m.user.id,
            name: m.user.name,
            avatarUrl: m.user.avatarUrl,
        }));
    }

}

