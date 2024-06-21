"use server"
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import {z} from 'zod'
import prisma from './lib/db';
import { CategoryTypes } from '@prisma/client';
import { stripe } from './lib/stripe';

export type State = {
    status: 'error' | 'success' | undefined;
    errors?: {
        [key: string]: string[];
    };
    message?: string | null ;
}

const productSchema = z.object({
    name: z.string().min(3, {message: 'Name must be at least 3 characters'}),
    category: z.string().min(1, {message: 'Category is required'}),
    price: z.number().min(1, {message: 'Price must be at least 1'}),
    description: z.string().min(10, {message: 'Description must be at least 10 characters'}),
    images: z.array(z.string()).min(1, { message: 'At least one image is required' })
});

const userSettingsSchema = z.object({
    firstName: z.string().min(3, {message: 'Last name is required'}).or(z.literal("")).optional(),
    lastName: z.string().min(3, {message: 'Last name is required'}).or(z.literal("")).optional(),
})

export async function SellProduct(prevState: any, formData: FormData) {
    const {getUser} = getKindeServerSession();
    const user = await getUser();
    if(!user || user === null || !user.id){
        throw new Error("User must log in to sell products");
    };

    const validateFields = productSchema.safeParse({
        name : formData.get('name'),
        category : formData.get('category'),
        price : Number(formData.get('price')),
        description : formData.get('description'),
        images : JSON.parse(formData.get('images') as string),
    })

    if(!validateFields.success){
        const state: State = {
            status: 'error',
            errors: validateFields.error.flatten().fieldErrors,
            message: 'Oops, something went wrong'
        };

        return state;
    }

  await prisma.product.create({
    data: {
        name: validateFields.data.name,
        category: validateFields.data.category as CategoryTypes,
        price: validateFields.data.price,
        description: validateFields.data.description,
        images: validateFields.data.images,
        userId: user.id
    }
  })

    const state: State = {
        status: 'success',
        message: 'Product successfully created'
    };

    return state;
}

export async function UpdateUserSettings(prevState: any, formData: FormData) {
    const {getUser} = getKindeServerSession(); 
    const user = await getUser();

    if(!user){
        throw new Error("User must be logged in");
    }

    const validateFields = userSettingsSchema.safeParse({
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
    });

    if(!validateFields.success){
        const state: State = {
            status : 'error',
            errors : validateFields.error.flatten().fieldErrors,
            message : 'Oops, something went wrong'
        };

        return state;
    }
    
    const data = await prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            firstName: validateFields.data.firstName,
            lastName: validateFields.data.lastName
        }
    });

    const state: State = {
        status : 'success',
        message : 'Your settings have been updated'
    };

    return state;
        
}

export async function BuyProduct(prevState: any, formData: FormData) {
    const id = formData.get('id') as string; 
   const data = await prisma.product.findUnique({
       where: {
           id: id
       },
       select: {
           name: true,
           price: true,
           description: true,
           images: true
       },
   });

   const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
        {
            price_data: {
                currency: 'usd',
                unit_amount: Math.round(data?.price as number * 100),
                product_data: {
                    name: data?.name as string,
                    description: data?.description,
                    images: data?.images,
                },
            },
            quantity: 1,
        }
    ],
    success_url: 'http://localhost:3000/payment/success',
    cancel_url: 'http://localhost:3000/payment/cancel',
   })
}