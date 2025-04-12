import { StudyLogRepository } from "@/repositories/StudyLogRepository";
interface GetGroupLogsUseCaseRequest {
    groupId: number;
}

interface GetGroupLogsUseCaseResponse {
    logs: {
        id: string;
        title: string;
        note?: string;
        imageUrl: string;
        studiedAt: Date;
        createdAt: Date;
        user: {
            id: string;
            name: string;
        };
    }[];
}



export class GetGroupLogsUseCase {
    constructor(private studyLogRepository: StudyLogRepository) { }

    async execute({
        groupId,
    }: GetGroupLogsUseCaseRequest): Promise<GetGroupLogsUseCaseResponse> {
        const logs = await this.studyLogRepository.findManyByGroupId(groupId);

        return {
            logs: logs.map((log) => ({
                id: log.id,
                title: log.title,
                note: log.note ?? undefined,
                imageUrl: log.imageUrl,
                studiedAt: log.studiedAt,
                createdAt: log.createdAt,
                user: {
                    id: log.user.id,
                    name: log.user.name,
                },
            })),
        };
    }
}
