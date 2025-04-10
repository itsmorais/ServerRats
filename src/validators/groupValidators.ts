import z from 'zod';

export const createGroupBodySchema = z.object({
    name: z.string().min(3),
    description:z.string().min(10),
    imageSrc: z.string().url(),
    isPublic: z.boolean(),
    startDate: z.string().transform((date) => new Date(date)),
    endDate: z.string().optional().transform((date) => date ? new Date(date) : undefined),
  });
