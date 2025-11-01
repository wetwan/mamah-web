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
    password: z.string().min(6, "Password must be at least 6 characters").optional(),
    firstName: z.string().min(3, 'First name must have at least 3 characters').nonempty('First name is required'),
    lastName: z.string().min(3, 'Last name must have at least 3 characters').nonempty('Last name is required'),
    address1: z.string().min(3, 'Address Line 1 must have at least 3 characters').nonempty('Address Line 1 is required'),
    address2: z.string().min(3, 'Address Line 2 must have at least 3 characters').optional(),
    phone: z.string().min(10, 'Phone must be at least 10 digits').nonempty('Phone number is required'),
    country: z.string().min(2, 'Country must be selected').nonempty('Country is required'),
    state: z.string().min(2, 'State/Region must be selected').nonempty('State/Region is required'),
    poster: z.string().min(3, 'Postal/Zip Code must have at least 3 characters').optional(),

}).transform(data => ({
    ...data,
    fullName: `${data.firstName} ${data.lastName}`,
}));


export type ShippingInputData = z.input<typeof shippingSchema>;
export type OrderShippingData = z.output<typeof shippingSchema>;
export type shippingData = z.infer<typeof shippingSchema>;

export const PaymentMethodSchema = z.enum([
    "cash_on_delivery"
    , // Including 'card' as a likely valid option
    "card"
]);

export type PaymentMethodType = z.infer<typeof PaymentMethodSchema>;

export type LoginData = z.infer<typeof loginSchema>;
export type singUpData = z.infer<typeof signUpSchema>;
