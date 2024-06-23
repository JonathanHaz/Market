import { BuyProduct } from "@/app/actions";
import prisma from "@/app/lib/db";
import { BuyButton } from "@/components/SubmitButtons";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import {unstable_noStore as noStore} from 'next/cache'


async function getData(id: string) {
    const data = await prisma.product.findUnique({
        where: {
            id: id
        },
        select: {
            category: true,
            description: true,
            id: true,
            images: true,
            name: true,
            price: true ,
            createdAt: true,
            User: {
                select: {
                    profileImage: true,
                    firstName: true,
                }
            }
        }
    });
    return data
}


export default async function ProductPage({params}: {params: {id: string}}) {
    noStore();
    const data = await getData(params.id)
  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 lg:grid lg:grid-rows-1 lg:grid-cols-7 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16 mt-24">
        <Carousel className="lg:row-end-1 lg:col-span-4">
            <CarouselContent>
                {data?.images?.map((image, index) => (
                    <CarouselItem key={index}>
                        <div className="aspect-w-3 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden">
                            <Image src={image as string} alt="Product Image" fill className="object-cover w-full h-full rounded-lg"/>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="ml-16"/>
            <CarouselNext className="mr-16"/>
        </Carousel>
        <div className="max-w-2xl mx-auto mt-5 lg:max-w-none lg:mt-0 lg:row-end-2 lg:row-span-2 lg:col-span-3">
                <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">{data?.name}</h1>
                <p className="mt-2 text-muted-foreground">{data?.description}</p>

                <form action={BuyProduct}>
                    <input type="hidden" name="id" value={data?.id} />
                    <BuyButton price={data?.price as number} />
                </form>

                <div className="border-t border-gray-200 mt-10 pt-10">
                    <div className="grid grid-cols-2 w-full gap-y-3">
                        <h3 className="text-sm font-medium text-muted-foreground col-span-1">Released:</h3>
                        <h3 className="text-sm font-medium text-black col-span-1">{new Intl.DateTimeFormat("en-EU", {dateStyle: "long",}).format(data?.createdAt)}</h3>
                        <h3 className="text-sm font-medium text-muted-foreground col-span-1">Category:</h3>
                        <h3 className="text-sm font-medium text-black col-span-1 capitalize">{data?.category}</h3>
                    </div>
                </div>
                <div className="border-t border-gray-200 mt-10">

                </div>
                <div className="grid grid-cols-2 w-full gap-y-3 mt-10">
                    <h3 className="text-sm font-medium text-muted-foreground col-span-1">Author:</h3>
                    <h3 className="text-sm font-medium text-black col-span-1">{data?.User?.firstName}</h3>
                </div>
        </div>
    </div>
  )
}
