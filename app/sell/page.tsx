
import { Card,} from "@/components/ui/card";
import { SellForm } from "@/components/forms/SellForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import {unstable_noStore as noStore} from 'next/cache'


export default async function Sell() {
  noStore();
  const {getUser} = getKindeServerSession()
  const user = await getUser()

    if(!user){
      redirect('/')
    }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <Card>
       <SellForm/>
      </Card>
    </div>
  )
}
