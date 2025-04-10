import { GroupsRepository } from "@/repositories/GroupRepository";
import { MembershipRepository } from "@/repositories/PrismaMembershipRepository";

export class JoinGroupUseCase {
    constructor(private membershipRepository: MembershipRepository,
        private groupRepository: GroupsRepository
    ) { }

    async execute(userId: string, groupCode: string) {

        const group = await this.groupRepository.findByGroupCode(groupCode);

        if (!group) throw new Error("Group not found");

        const alreadyMember = await this.membershipRepository.findByUserIdAndGroupId(userId, group.id);

        if (alreadyMember) throw new Error("User is already a member of this group!");

        const membership = await this.membershipRepository.create({
            group: { connect: { id: group.id } },
            user: { connect: { id: userId } }
        });


        return group;
    }
}
