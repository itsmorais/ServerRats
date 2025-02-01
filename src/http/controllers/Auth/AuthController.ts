import { InvalidCredentialsError } from "@/use-cases/errors/InvalidCredentialsError";
import { makeAuthenticateUserUseCase } from "@/use-cases/factories/MakeAuthUser";
import { Request, Response } from "express";
import { z } from 'zod'


export async function authenticate(req: Request, res: Response) {
    try {
        const authenticateBodySchema = z.object({
            email: z.string().email(),
            password: z.string().min(6),
        });
        const { email, password } = authenticateBodySchema.parse(req.body);

        const authUseCase = makeAuthenticateUserUseCase()

        const authenticatedUser = await authUseCase.execute({ email, password });
        return res.status(201).json(authenticatedUser);

    } catch (err) {
        if (err instanceof InvalidCredentialsError) {
            return res.status(400).json({ message: err.message })
        }
        throw err
    }

}


