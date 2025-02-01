import { PrismaUserRepository } from "@/repositories/PrismaUserRepository";
import { AuthenticateUserUseCase } from "../AuthenticateUserUseCase";

export function makeAuthenticateUserUseCase() {
    const userRepository = new PrismaUserRepository();
    const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);
    return authenticateUserUseCase
}