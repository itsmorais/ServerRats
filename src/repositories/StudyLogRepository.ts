import { Prisma, StudyLog } from "@prisma/client";

export interface StudyLogRepository {
    create(data: Prisma.StudyLogCreateInput): Promise<StudyLog>;
    findManyByGroupId(groupId: number): Promise<(StudyLog & {
        user: {
            id: string;
            name: string;
        }
    }
    )[]>;
}