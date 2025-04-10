import { GroupsRepository } from "@/repositories/GroupRepository";
import { customAlphabet } from 'nanoid'

interface CreateGroupRequest {
    name: string;
    imageSrc: string;
    isPublic: boolean;
    ownerId: string;
    startDate: Date;
    endDate?: Date;
}

export class CreateGroupUseCase {
    constructor(private groupRepository: GroupsRepository) { }

    async execute({ name, imageSrc, isPublic, ownerId, startDate, endDate }: CreateGroupRequest) {
        const nanoid = customAlphabet("QPWOEIRUTYALSKDJFHGZMXNCBV0976431285", 8);
        let groupCode = nanoid();

        while (await this.groupRepository.findByGroupCode(groupCode)) {
            groupCode = nanoid();
        }


        const group = await this.groupRepository.create({
            name,
            imageSrc,
            isPublic,
            groupCode,
            startDate,
            endDate,
            owner: {
                connect: {
                    id: ownerId
                }
            }
        });

        return { group };

    }
}