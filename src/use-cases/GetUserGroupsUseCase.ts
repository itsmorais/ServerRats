import { MembershipRepository } from "@/repositories/PrismaMembershipRepository";

export class GetUserGroupsUseCase {
    constructor(private membershipRepository: MembershipRepository) { }

    async execute(userId: string) {
        const memberships = await this.membershipRepository.findManyByUserId(userId);
        const groups = memberships.map((membership) => membership.group)

        return { groups };
    }
}
