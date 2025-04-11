import { GroupsRepository } from "@/repositories/GroupRepository";
import { MembershipRepository } from "@/repositories/PrismaMembershipRepository";
import { UserAlreadyInGroupError } from "./errors/UserAlreadyInGroupError";

export class JoinGroupUseCase {
    constructor(private membershipRepository: MembershipRepository,
        private groupRepository: GroupsRepository
    ) { }

    async execute(userId: string, groupCode: string) {

        const group = await this.groupRepository.findByGroupCode(groupCode);

        if (!group) throw new Error("Group not found");

        const alreadyMember = await this.membershipRepository.findByUserIdAndGroupId(userId, group.id);

        if (alreadyMember) throw new UserAlreadyInGroupError();

        const membership = await this.membershipRepository.create({
            group: { connect: { id: group.id } },
            user: { connect: { id: userId } }
        });


        return group;
    }
}
