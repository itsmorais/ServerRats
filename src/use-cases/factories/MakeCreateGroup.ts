import { PrismaGroupsRepository } from "@/repositories/PrismaGroupRepository";
import { CreateGroupUseCase } from "../CreateGroupUseCase";
import { PrismaMembershipRepository } from "@/repositories/MembershipRepository";


export function makeCreateGroupUseCase() {
    const groupRepository = new PrismaGroupsRepository();
    const membershipRepository = new PrismaMembershipRepository()
    const createGroupUseCase = new CreateGroupUseCase(groupRepository,membershipRepository);
    return createGroupUseCase;

}