import { Prisma, Group } from '@prisma/client';

export interface GroupsRepository {
    create(data: Prisma.GroupCreateInput): Promise<Group>;
    findByGroupCode(code: string): Promise<Group | null>;
    findById(id:number):Promise<Group | null>
}