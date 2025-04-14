import z from 'zod';

export const createGroupBodySchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  imageSrc: z.string().url(),
  isPublic: z.boolean(),
  startDate: z.string().transform((date) => new Date(date)),
  endDate: z.string().optional().transform((date) => date ? new Date(date) : undefined),
});


export const joinGroupBodySchema = z.object({
  groupCode: z.string().length(8, "Invalid group code")
});

export const leaderBoardQuerySchema = z.object({
  range: z.enum(["weekly", "monthly", "yearly", "all"]).optional().default("all"),
});

export const leaderboardParamsSchema = z.object({
  groupId: z.string().refine((id) => !isNaN(Number(id)), {
    message: "groupId must be a valid number",
  }),
});

export const groupDetailParamsSchema = z.object({
  groupId: z.string().refine((val) => !isNaN(Number(val)), {
    message: "groupId must be a valid number",
  }),
});