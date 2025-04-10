import { PrismaClient } from "@prisma/client";
import { IDatabase } from "./IDatabase";
import { env } from "@/env";

export class PrismaDatabase implements IDatabase {
    private static instance: PrismaDatabase;
    private client: PrismaClient

    private constructor(){
        this.client = new PrismaClient({
            log:env.NODE_ENV === 'dev' ? ['query'] : [],
        })
    }

    public static getInstance():PrismaDatabase{
        if(!PrismaDatabase.instance){
            PrismaDatabase.instance = new PrismaDatabase();
        }
        return PrismaDatabase.instance;
    }

    async connect(): Promise<void> {
        console.log("CONECTADO!")
        await this.client.$connect();
    }

    async disconnect(): Promise<void> {
        await this.client.$disconnect();
    }

    getClient():PrismaClient{
        return this.client;
    }
}