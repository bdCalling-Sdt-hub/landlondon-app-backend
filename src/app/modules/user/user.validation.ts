import { z } from 'zod';

const createAdminZodSchema = z.object({
    body: z.object({
        name: z.string({ required_error: 'Name is required' }),
        email: z.string({ required_error: 'Email is required' }),
        password: z.string({ required_error: 'Password is required' }),
        contact: z.string({ required_error: 'Phone Number is required' }),
        role: z.string({ required_error: 'Role is required' })
    })
});

const createUserZodSchema = z.object({
    body: z.object({
        name: z.string({ required_error: 'Name is required' }),
        email: z.string({ required_error: 'Email is required' }).email({ message: 'Invalid email' }),
        password: z.string({ required_error: 'Password is required' }),
        contact: z.string({ required_error: 'Phone Number is required' })
    })
});

export const UserValidation = { 
    createAdminZodSchema,
    createUserZodSchema
};  