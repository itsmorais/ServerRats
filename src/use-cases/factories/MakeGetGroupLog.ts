import { PrismaMembershipRepository } from "@/repositories/MembershipRepository";
import { GetGroupLogsUseCase } from "../GetGroupLogUseCase";
import { PrismaStudyLogRepository } from "@/repositories/PrismaStudyLogRepository";




export function makeGetGroupLogUseCase() {
    const StudyLogRepository = new PrismaStudyLogRepository();
    const getGroupsLogUseCase = new GetGroupLogsUseCase(StudyLogRepository);
    return getGroupsLogUseCase;

}