import prisma from "@/app/lib/db"
import Link from "next/link";
import { ProductCard } from "./ProductCard";

async function getData(){
    const data = await prisma.product.findMany({
        select: {
            price: true,
            description: true,
            name: true,
            images: true,
            category: true,
            id: true,
        },
        take: 4,
        orderBy: {
            createdAt: 'desc'
        }
    });

    return data;
}

export async function NewestProducts() {
    const data = await getData();
  return (
    <div className="mt-12">
      <div className="md:flex md:item-center md:justify-between">
            <h2 className="text-2xl font-extrabold tracking-tighter">Newest Products</h2>
            <Link className="text-sm hidden font-medium text-primary hover:text-primary/80 md:block" href={'/'}>All Products <span>&rarr;</span></Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 mt-4 gap-10">
            {data.map((product) => (
                <ProductCard key={product.id} id={product.id} title={product.name} price={product.price} description={product.description} images={product.images}/>
            ))}
      </div>
    </div>
  )
}
