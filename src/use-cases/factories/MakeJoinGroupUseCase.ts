import { PrismaMembershipRepository } from "@/repositories/MembershipRepository";
import { PrismaGroupsRepository } from "@/repositories/PrismaGroupRepository";
import { JoinGroupUseCase } from "../JoinGroupUseCase";



export function makeJoinGroupUseCase() {
    const groupRepository = new PrismaGroupsRepository();
    const membershipRepository = new PrismaMembershipRepository();

    const joinGroupUseCase = new JoinGroupUseCase(membershipRepository, groupRepository)

    return joinGroupUseCase
}