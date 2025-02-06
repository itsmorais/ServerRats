import { Request, Response } from "express";
import { UserAlreadyExistsError } from "@/use-cases/errors/UserAlreadyExistsError";
import { registerBodySchema } from "@/validators/userValidators";
import { makeCreateUserUseCase } from "@/use-cases/factories/MakeCreateUser";
import logger from "@/utils/logger";

export class UserController {


    async create(req: Request, res: Response) {
        try {
            const { name, email, password, role } = registerBodySchema.parse(req.body);

            const createUserUseCase = makeCreateUserUseCase()

            const user = await createUserUseCase.execute({ name, email, password, role });
            logger.info(`Novo usuário registrado:${email}`)
            return res.status(201).json(user);
        } catch (err) {
            if (err instanceof UserAlreadyExistsError) {
                logger.error(`Erro ao registrar novo usuário:${err.message}`)
                return res.status(409).json({ message: err.message });
            }
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}
