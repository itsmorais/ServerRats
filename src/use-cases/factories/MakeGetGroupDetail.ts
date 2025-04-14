import { PrismaGroupsRepository } from "@/repositories/PrismaGroupRepository";
import { PrismaStudyLogRepository } from "@/repositories/PrismaStudyLogRepository";
import { GetGroupDetailUseCase } from "../GetGroupDetailUseCase";



export function makeGetGroupDetail() {
    const groupRepository = new PrismaGroupsRepository();
    const logRepository = new PrismaStudyLogRepository();
    const makeGroupDetail = new GetGroupDetailUseCase(groupRepository, logRepository);
    return makeGroupDetail;

}