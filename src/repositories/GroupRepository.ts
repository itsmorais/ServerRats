import { Prisma, Group } from '@prisma/client';

export interface LeaderboardEntry {
    userId: string;
    name: string;
    avatarUrl?: string | null;
    studiedAt: Date;
  }



export interface GroupsRepository {
    create(data: Prisma.GroupCreateInput): Promise<Group>;
    findByGroupCode(code: string): Promise<Group | null>;
    findById(id:number):Promise<Group | null>
    getLeaderboard(groupId:string, startDate?:Date):Promise<LeaderboardEntry[]>;
}