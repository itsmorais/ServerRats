import { PrismaDatabase } from "./PrismaDatabase";
import { IDatabase } from "./IDatabase";
export class DatabaseFactory {
    static createDatabase(type: "prisma" | "knex"): IDatabase {
        switch (type) {
            case 'prisma':
                return PrismaDatabase.getInstance();
            default:
                throw new Error("Conexão não suportada")

        }
    }
}