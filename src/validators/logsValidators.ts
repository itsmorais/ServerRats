import z from 'zod'


export const bodySchema = z.object({
    title: z.string().min(3),
    note: z.string().optional(),
    imageUrl: z.string().url(),
    studiedAt: z.coerce.date(),
    groupIds: z.array(z.number()).min(1),
});
