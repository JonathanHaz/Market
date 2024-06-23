import prisma from "@/app/lib/db";
import { stripe } from "@/app/lib/stripe";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from 'next/cache';

const getBaseUrl = () => {
    return process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : 'https://market-lvuzfn5cl-jonathanhs-projects.vercel.app';
};

export async function GET() {
    noStore();
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || user === null || !user.id) {
        throw new Error("No User");
    }

    let dbUser = await prisma.user.findUnique({
        where: {
            id: user.id
        }
    });

    if (!dbUser) {
        const account = await stripe.accounts.create({
            email: user.email as string,
            type: 'express',
            capabilities: {
                card_payments: { requested: true },
                transfers: { requested: true },
            }
        });

        dbUser = await prisma.user.create({
            data: {
                id: user.id,
                firstName: user.given_name ?? "",
                lastName: user.family_name ?? "",
                email: user.email ?? "",
                profileImage: user.picture ?? `https://avatar.vercel.sh/${user.given_name}`,
                connectedAccountId: account.id
            }
        });
    }

    return NextResponse.redirect(getBaseUrl());
}
