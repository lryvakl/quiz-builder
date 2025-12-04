import { z } from 'zod';

export const SubmitQuizSchema = z.object({
  body: z.object({
    answers: z.array(
      z.object({
        questionId: z.number(),
        answer: z.any(),
      })
    ),
  }),
  params: z.object({
    id: z.string().regex(/^\d+$/, 'ID must be a number'),
  }),
});

export type SubmitQuizInput = z.infer<typeof SubmitQuizSchema>;
