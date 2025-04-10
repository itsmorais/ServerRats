import { PrismaMembershipRepository } from "@/repositories/MembershipRepository";
import { GetUserGroupsUseCase } from "../GetUserGroupsUseCase";



export function makeGetUserGroupsUseCase() {
    const membershipRepository = new PrismaMembershipRepository();
    const getUserGroupsUseCase = new GetUserGroupsUseCase(membershipRepository);
    return getUserGroupsUseCase;

}