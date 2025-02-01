import { UserAlreadyExistsError } from "@/use-cases/errors/UserAlreadyExistsError";
import { makeCreateUserUseCase } from "@/use-cases/factories/MakeCreateUser";
import { Request, Response } from "express";
import { z } from 'zod'


export async function createUser(req: Request, res: Response) {
    try {
        const registerBodySchema = z.object({
            name: z.string(),
            email: z.string().email(),
            password: z.string().min(6),
            role: z.enum(["MEMBER","ADMIN"]).default("MEMBER")
        });
        const { name, email, password,role } = registerBodySchema.parse(req.body);
        //console.log(name,email,password)

        const createUserUseCase = makeCreateUserUseCase()

        const user = await createUserUseCase.execute({ name, email, password,role });
        return res.status(201).json(user);

    } catch (err) {
        if (err instanceof UserAlreadyExistsError) {
            return res.status(409).json({ message: err.message })
        }
        throw err
    }

}


