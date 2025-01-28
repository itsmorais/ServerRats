import { makeCreateUserUseCase } from "@/use-cases/factories/MakeCreateUser";
import {  Request, Response } from "express";
import { z } from 'zod'


export async function createUser(req: Request, res: Response) {
    try {
        const registerBodySchema = z.object({
            name: z.string(),
            email: z.string().email(),
            password: z.string().min(6),
        });
        console.log("HCEGOU PAPAI")
        const { name, email, password } = registerBodySchema.parse(req.body);
        //console.log(name,email,password)

        const createUserUseCase = makeCreateUserUseCase()

        const user = await createUserUseCase.execute({ name, email, password });
        return res.status(201).json(user);

    } catch(error:any) {
        return res.status(400).json({message:error.message})
    }

}


