import { PrismaStudyLogRepository } from "@/repositories/PrismaStudyLogRepository";
import { CreateStudyLogUseCase } from "../CreateStudyLogUseCase";
import { PrismaClient } from "@prisma/client";



export function makeCreateStudyLog() {
    const studyLogRepository = new PrismaStudyLogRepository();
    const prismaClient = new PrismaClient()
    const createStudyLogUseCase = new CreateStudyLogUseCase(studyLogRepository, prismaClient);
    return createStudyLogUseCase;

}