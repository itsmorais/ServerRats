import { PrismaGroupsRepository } from "@/repositories/PrismaGroupRepository";
import { GetLeaderboardUseCase } from "../GetLeaderboardUseCase";



export function makeGetLeaderboard() {
    const repository = new PrismaGroupsRepository();
    const getLeaderboardUseCase = new GetLeaderboardUseCase(repository)
    return getLeaderboardUseCase;
}