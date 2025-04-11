import { JwtRequest, Response } from "express";
import { createGroupBodySchema, joinGroupBodySchema } from "../../../validators/groupValidators";
import { makeCreateGroupUseCase } from "@/use-cases/factories/MakeCreateGroup";
import logger from "@/utils/logger";
import { makeGetUserGroupsUseCase } from "@/use-cases/factories/MakeGetUserGroups";
import { makeJoinGroupUseCase } from "@/use-cases/factories/MakeJoinGroupUseCase";
import { UserAlreadyInGroupError } from "@/use-cases/errors/UserAlreadyInGroupError";


export class GroupsController {


    async create(req: JwtRequest, res: Response) {
        try {


            const createGroupBody = createGroupBodySchema.safeParse(req.body);

            if (!createGroupBody.success) {
                let error = createGroupBody.error.message
                logger.error(error);
                return res.status(409).json({ message: error });

            }

            const { imageSrc, isPublic, name, description, startDate, endDate } = createGroupBody.data

            const userId = req.user?.id; // JWT middleware

            if (!userId) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const createGroupUseCase = makeCreateGroupUseCase()

            const { group } = await createGroupUseCase.execute({ name, description, imageSrc, isPublic, ownerId: userId, startDate, endDate })
            logger.info(`Novo grupo registrado:${group.name} - ${group.groupCode}`);
            return res.status(201).json(group);

        } catch (err) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    async list(req: JwtRequest, res: Response) {
        try {
            const userId = req.user?.id;


            if (!userId) {
                return res.status(401).json({ message: "Unauthorized" });

            }

            console.log("USER ID:", userId)

            const listUserGroupsUseCase = makeGetUserGroupsUseCase();

            const { groups } = await listUserGroupsUseCase.execute(userId);
            console.log(`Usuário ${userId} possui ${groups.length} grupo(s).`);

            return res.status(200).json(groups);
        } catch (error) {
            logger.error("Erro ao listar grupos do usuário:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    async join(req: JwtRequest, res: Response) {
        try {
            const userId = req.user?.id;


            if (!userId) {
                return res.status(401).json({ message: "Unauthorized" });

            }

            const parsedBody = joinGroupBodySchema.safeParse(req.body);

            if (!parsedBody.success) {
                return res.status(400).json({ message: parsedBody.error.message });

            }

            const { groupCode } = parsedBody.data;

            const joinGroupUseCase = makeJoinGroupUseCase();
            const result = await joinGroupUseCase.execute(userId, groupCode);

            logger.info(`Usuário ${userId} entrou no grupo com código ${groupCode}`);
            console.log(`Usuário ${userId} entrou no grupo com código ${groupCode}`);

            return res.status(200).json(result);



        } catch (error) {
            if (error instanceof UserAlreadyInGroupError) {
                logger.error("Erro ao entrar no grupo:", error);
                return res.status(400).json({ message: error.message });


            }
            logger.error("Erro ao entrar no grupo:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }

    }
}
