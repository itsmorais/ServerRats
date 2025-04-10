import { Prisma, Group } from "@prisma/client";
import { PrismaDatabase } from "@/database/PrismaDatabase";
import { GroupsRepository } from "./GroupRepository";

export class PrismaGroupsRepository implements GroupsRepository {
    private prisma = PrismaDatabase.getInstance().getClient();


    create(data: Prisma.GroupCreateInput): Promise<Group> {
        return this.prisma.group.create({ data });
    }

    findByGroupCode(code: string): Promise<Group | null> {
        return this.prisma.group.findUnique({
            where: {
                groupCode: code
            }
        });
    }

    findById(id: number): Promise<Group | null> {
        return this.prisma.group.findUnique({
            where: {
                id: id
            }
        })
    }

}