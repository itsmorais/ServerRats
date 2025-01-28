import { Prisma, User } from "@prisma/client";
import { UserRepository } from "./UserRepository";
import { PrismaDatabase } from "@/database/PrismaDatabase";

export class PrismaUserRepository implements UserRepository {
    private prisma = PrismaDatabase.getInstance().getClient();


    async create(data: Prisma.UserCreateInput) {
        const user = await this.prisma.user.create({
            data,
        });
        return user;
    }

    async findByEmail(email: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                email,
            }
        });
        return user;
    }

    async findById(id: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                id
            }
        });

        return user;
    }

}