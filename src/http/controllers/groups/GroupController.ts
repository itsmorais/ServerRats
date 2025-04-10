import { JwtRequest, Response } from "express";
import { createGroupBodySchema } from "../../../validators/groupValidators";
import { makeCreateGroupUseCase } from "@/use-cases/factories/MakeCreateGroup";
import logger from "@/utils/logger";


export class GroupsController {


    async create(req: JwtRequest, res: Response) {
        try {


            const createGroupBody = createGroupBodySchema.safeParse(req.body);

            if (!createGroupBody.success) {
                let error = createGroupBody.error.message
                logger.error(error);
                return res.status(409).json({ message: error });

            }

            const { imageSrc, isPublic, name, startDate, endDate } = createGroupBody.data

            const userId = req.user?.id; // JWT middleware

            if (!userId) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const createGroupUseCase = makeCreateGroupUseCase()

            const { group } = await createGroupUseCase.execute({ name, imageSrc, isPublic, ownerId: userId, startDate, endDate })
            logger.info(`Novo grupo registrado:${group.name} - ${group.groupCode}`);
            return res.status(201).json(group);

        } catch (err) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}
