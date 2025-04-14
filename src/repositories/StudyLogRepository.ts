import { Prisma, StudyLog } from "@prisma/client";


export interface StudyLogFeedEntry {
    id: string;
    title: string;
    note?: string | null;
    imageUrl: string;
    studiedAt: Date;
    createdAt: Date;
    user: {
      id: string;
      name: string;
      avatarUrl?: string | null;
    };
  }


export interface StudyLogRepository {
    create(data: Prisma.StudyLogCreateInput): Promise<StudyLog>;
    findManyByGroupId(groupId: number): Promise<StudyLogFeedEntry[]>;

}