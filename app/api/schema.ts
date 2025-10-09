import { z } from "zod";


export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signUpSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    firstName: z.string().min(3, 'First name most have atleast 3 characters'),
    lastName: z.string().min(3, 'First name most have atleast 3 characters'),
    address: z.string().min(3, 'First name most have atleast 3 characters'),
    phone: z.string().min(3, 'First name most have atleast 3 characters'),
});
export const shippingSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    firstName: z.string().min(3, 'First name most have atleast 3 characters'),
    lastName: z.string().min(3, 'First name most have atleast 3 characters'),
    address1: z.string().min(3, 'First name most have atleast 3 characters'),
    address2: z.string().min(3, 'First name most have atleast 3 characters'),
    phone: z.string().min(3, 'First name most have atleast 3 characters'),
    country: z.string().min(3, 'First name most have atleast 3 characters'),
    state: z.string().min(3, 'First name most have atleast 3 characters'),
    poster: z.string().min(3, 'First name most have atleast 3 characters'),

});


export type LoginData = z.infer<typeof loginSchema>;
export type singUpData = z.infer<typeof signUpSchema>; 
export type shippingData = z.infer<typeof shippingSchema>; 