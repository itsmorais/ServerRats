import { PrismaUserRepository } from "@/repositories/PrismaUserRepository";
import { CreateUserUseCase } from "../CreateUserUseCase";

export function makeCreateUserUseCase(){
    const userRepository = new PrismaUserRepository();
    const createUserUseCase = new CreateUserUseCase(userRepository);
    return createUserUseCase
}