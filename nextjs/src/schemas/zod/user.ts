import z from 'zod';

import { UserRegex } from '~/constants/regex';

export const userSchema = z.object({
    name: z
        .string()
        .regex(UserRegex.fullName, { message: 'Name must only contain letters, numbers, underscores and dashes' })
        .max(128, { message: 'Name must be at most 128 characters long' })
        .min(3, { message: 'Name must be at least 3 characters long' })
        .nonempty('Name is required!')
        .trim(),
    email: z
        .string()
        .regex(UserRegex.email, { message: 'Value must be a valid email address' })
        .max(55, { message: 'Email must be at most 55 characters long' })
        .email({ message: 'Email must be a valid email address' })
        .nonempty('Email is required!')
        .trim(),
    password: z
        .string()
        // .regex(UserRegex.password, {
        //     message:
        //         'Password must contain at least one lowercase letter, one uppercase letter, one number and one special character',
        // })
        .max(18, { message: 'Password must be at most 18 characters long' })
        .min(8, { message: 'Password must be at least 8 characters long' })
        .nonempty('Password cannot be blank!'),
    terms: z.boolean().refine(value => value === true, {
        message: 'You cannot proceed without accepting terms and conditions.',
    }),
});

export type UserType = z.infer<typeof userSchema>;
