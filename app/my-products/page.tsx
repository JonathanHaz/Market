import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db"
import { ProductCard } from "@/components/ProductCard";
import { redirect } from "next/navigation";

async function getData(userId: string) {
    const data = await prisma.product.findMany({
        where: {
            userId: userId
        },
        select: {
            name: true,
            price: true,
            description: true,
            id: true,
            images: true
        }
    });
    return data
}

export default async function MyProductsPage() {
    const {getUser} = getKindeServerSession()
    const user = await getUser()

    if(!user){
        redirect('/')
    }

    const data = await getData(user.id)
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8">
    <h1 className="text-2xl font-bold">My Products</h1>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 sm:grid-cols-2 mt-4">
        {data?.map((product) => (
            <ProductCard key={product.id} id={product.id} title={product.name} price={product.price} description={product.description} images={product.images}/>
        ))}
    </div>
    </div>
  )
}
