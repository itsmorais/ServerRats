import { PrismaGroupsRepository } from "@/repositories/PrismaGroupRepository";
import { CreateGroupUseCase } from "../CreateGroupUseCase";


export function makeCreateGroupUseCase() {
    const groupRepository = new PrismaGroupsRepository();
    const createGroupUseCase = new CreateGroupUseCase(groupRepository);
    return createGroupUseCase;

}