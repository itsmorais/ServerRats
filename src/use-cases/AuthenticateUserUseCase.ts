import { User } from "@prisma/client"
import { UserRepository } from "@/repositories/UserRepository";
import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/InvalidCredentialsError";
import jwt from "jsonwebtoken";
import { env } from "@/env";


interface AuthenticateUserUseCaseRequest {
    email: string
    password: string
}

interface AuthenticateUserUseCaseResponse {
    user: User
    token: string
}

export class AuthenticateUserUseCase {
    constructor(private usersRepository: UserRepository) { }

    async execute({ email, password }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new InvalidCredentialsError()
        }

        const doesPasswordMatches = await compare(password, user.password_hash);
        if (!doesPasswordMatches) {
            throw new InvalidCredentialsError()
        }

        const token = jwt.sign(
            {
                sub: user.id,
                role: user.role
            }, env.JWT_SECRET,
            {
                expiresIn: "1h",

            });


        return { user, token }
    }


}