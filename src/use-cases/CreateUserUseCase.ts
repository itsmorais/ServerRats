import { UserRepository } from "@/repositories/UserRepository";
import bcrypt from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/UserAlreadyExistsError";


interface CreateUserRequest {
    name: string;
    email: string;
    password: string;
    role?: "ADMIN" | "MEMBER"
}

export class CreateUserUseCase {
    constructor(private userRepository: UserRepository) { }

    async execute({ name, email, password,role="MEMBER" }: CreateUserRequest) {

        const userWithSameEmail = await this.userRepository.findByEmail(email);

        if (userWithSameEmail) {
            throw new UserAlreadyExistsError()
        }

        const hashPassword = await bcrypt.hash(password, 6);

        const user = await this.userRepository.create({
            name,
            email,
            password_hash: hashPassword,
            role
        });

        return user;

    }
}