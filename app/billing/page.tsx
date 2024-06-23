import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "../lib/db";
import { Button } from "@/components/ui/button";
import { CreateStripeAccountLink } from "../actions";
import { SubmitButtons } from "@/components/SubmitButtons";

async function getData(userId: string) {
    const data = await prisma.user.findUnique({
        where: {
            id: userId
        }, select: {
            stripeConnectedLinked: true
        }
    });
    return data
}
       
 

export default async function BillingPage() {
    const {getUser} = getKindeServerSession()
    const user = await getUser()

    if(!user){
       redirect('/')
    }

    const data = await getData(user.id)
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <Card>
        <CardHeader>
            <CardTitle>Billing</CardTitle>
            <CardDescription>Find all your details regarding your billing</CardDescription>
        </CardHeader>
        <CardContent>
            {data?.stripeConnectedLinked === false && (
                <form action={CreateStripeAccountLink}>
                    <SubmitButtons title="Link your account to Stripe"/>
                </form>
            )}
            {data?.stripeConnectedLinked === true && (
                <form action="">
                    <SubmitButtons title="View Dashboard"/>
                </form>
            )}

        </CardContent>
      </Card>
    </div>
  )
}
