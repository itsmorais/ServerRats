import { JwtRequest, Response } from "express";
import logger from "@/utils/logger";
import { bodySchema } from "../../../validators/logsValidators";
import { makeCreateStudyLog } from "@/use-cases/factories/MakeCreateStudyLog";
import { makeGetGroupLogUseCase } from "@/use-cases/factories/MakeGetGroupLog";


export class LogController {

    async create(req: JwtRequest, res: Response) {
        try {

            const userId = req.user?.id;
            if (!userId) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const parsed = bodySchema.safeParse(req.body);

            if (!parsed.success) {
                return res.status(400).json({ message: parsed.error.message });
            }

            const { title, note, imageUrl, studiedAt, groupIds } = parsed.data;

            const createStudyLogUseCase = makeCreateStudyLog()

            const { log } = await createStudyLogUseCase.execute({
                userId,
                title,
                note,
                imageUrl,
                studiedAt,
                groupIds,
            });

            logger.info(`Log criado para o usuário ${userId} no dia ${studiedAt.toISOString()}`);
            return res.status(201).json(log);

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

            const groupId = Number(req.params.id);

            if (isNaN(groupId)) {
                return res.status(400).json({ message: "Invalid group ID" });

            }

            const getGroupsLogs = makeGetGroupLogUseCase();

            const { logs } = await getGroupsLogs.execute({ groupId });


            logger.info(`Logs listados para o grupo ${groupId}`);
            return res.status(200).json(logs);

        } catch (err) {
            logger.error("Erro ao buscar logs do grupo:", err);
            return res.status(500).json({ message: "Internal Server Error" });

        }
    }


}
