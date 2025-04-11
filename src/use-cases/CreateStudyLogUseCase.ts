import { StudyLogRepository } from "@/repositories/StudyLogRepository";
import { PrismaClient } from "@prisma/client";


interface CreateStudyLogUseCaseRequest {
    userId: string;
    title: string;
    note?: string;
    imageUrl: string;
    studiedAt: Date;
    groupIds: number[];
}

export class CreateStudyLogUseCase {
    constructor(private studyLogRepository: StudyLogRepository,
        private prisma: PrismaClient
    ) { }

    async execute({ userId, title, note, imageUrl, studiedAt, groupIds, }: CreateStudyLogUseCaseRequest) {

        const log = await this.studyLogRepository.create({
            title, note, imageUrl, studiedAt,
            user: { connect: { id: userId } }
        });

        // Relacionar com os grupos solicitados

        const groupLinks = groupIds.map((groupId) => ({
            studyLogId: log.id,
            groupId,
        }));

        await this.prisma.studyLogGroup.createMany({
            data: groupLinks,
            skipDuplicates: true,
        });

        return { log };

    }
}