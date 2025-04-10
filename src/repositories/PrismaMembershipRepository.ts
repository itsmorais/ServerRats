import { Prisma, GroupMembership, Group } from '@prisma/client';

export interface MembershipRepository {
    create(data: Prisma.GroupMembershipCreateInput): Promise<GroupMembership>;
    findManyByUserId(userId: string): Promise<(GroupMembership & { group: Group })[]>;
}