
import { Card,} from "@/components/ui/card";
import { SellForm } from "@/components/forms/SellForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function Sell() {
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
