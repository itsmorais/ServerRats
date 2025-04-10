import { Prisma, GroupMembership, Group } from "@prisma/client";
import { MembershipRepository } from "./PrismaMembershipRepository";
import { PrismaDatabase } from "@/database/PrismaDatabase";

export class PrismaMembershipRepository implements MembershipRepository {
    private prisma = PrismaDatabase.getInstance().getClient();

    async create(data: Prisma.GroupMembershipCreateInput): Promise<GroupMembership> {
        return this.prisma.groupMembership.create({ data });
    }

    async findManyByUserId(userId: string): Promise<(GroupMembership & { group: Group })[]> {
        const memberships = await this.prisma.groupMembership.findMany({
            where: {
                userId,
            },
            include:
            {
                group:
                {
                    include:
                    {
                        _count:
                        {
                            select:
                                { memberships: true }
                        }
                    }
                }
            }
        })

        return memberships;

    }

    async findByUserIdAndGroupId(userId: string, groupId: number): Promise<GroupMembership | null> {
        return await this.prisma.groupMembership.findUnique({
            where: { userId_groupId: { userId, groupId } },
        });

    }


}