import { Prisma, Group } from '@prisma/client';
import { GroupWithOwner } from './DTOS/GroupWithOwner';

export interface LeaderboardEntry {
    userId: string;
    name: string;
    avatarUrl?: string | null;
    studiedAt: Date;
  }

  export interface GroupMemberEntry {
    id: string;
    name: string;
    avatarUrl?: string | null;
  }



export interface GroupsRepository {
    create(data: Prisma.GroupCreateInput): Promise<Group>;
    findByGroupCode(code: string): Promise<Group | null>;
    findById(id:number):Promise<GroupWithOwner | null>
    getLeaderboard(groupId:string, startDate?:Date):Promise<LeaderboardEntry[]>;
    getGroupMembers(groupId: number): Promise<GroupMemberEntry[]>;

}