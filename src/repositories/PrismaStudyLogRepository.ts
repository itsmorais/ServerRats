import { Prisma, StudyLog } from "@prisma/client";
import { StudyLogFeedEntry, StudyLogRepository } from "./StudyLogRepository";
import { PrismaDatabase } from "@/database/PrismaDatabase";



export class PrismaStudyLogRepository implements StudyLogRepository {
    private prisma = PrismaDatabase.getInstance().getClient();

    async create(data: Prisma.StudyLogCreateInput): Promise<StudyLog> {
        return await this.prisma.studyLog.create({ data });
    }

    async findManyByGroupId(groupId: number): Promise<StudyLogFeedEntry[]> {
        return await this.prisma.studyLog.findMany({
            where: {
                groups: {
                    some: {
                        groupId
                    }
                }
            },
            include: {
                user: {
                    select: { id: true, name: true, avatarUrl: true }
                }
            },
            orderBy: { studiedAt: "desc" }
        })
    }

}