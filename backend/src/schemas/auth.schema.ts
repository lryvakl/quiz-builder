import { z } from 'zod';

export const RegisterSchema = z.object({
  body: z.object({
    email: z.string().email({ message: 'Invalid email format' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    name: z.string().optional(),
  }),
});

export const LoginSchema = z.object({
  body: z.object({
    email: z.string().email({ message: 'Invalid email format' }),
    password: z.string().min(1, { message: 'Please enter a password' }),
  }),
});

export type RegisterInput = z.infer<typeof RegisterSchema>['body'];
export type LoginInput = z.infer<typeof LoginSchema>['body'];
