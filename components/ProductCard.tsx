import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Button } from "./ui/button";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";

interface ProductCardProps {
    images: string[];
    title: string;
    price: number;
    description: string;
    id: string;

}

export function ProductCard({images, title, price, description, id}: ProductCardProps) {
  return (
    <div className="rounded-lg">
        <Carousel className="w-full mx-auto">
            <CarouselContent>
                {images.map((image, index) => (
                    <CarouselItem key={index}>
                         <div className="relative h-[230px] bg-slate-50">
            <Image alt="product image" src={image} fill className="object-contain w-full h-full rounded-lg border border-gray-200"/>
        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
                <CarouselPrevious className="ml-16"/>
                <CarouselNext className="mr-16"/>
        </Carousel>

       
        <div className="flex justify-between item-center mt-2">
            <h1 className="font-semibold text-xl">{title}</h1>
            <h3 className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/10">${price}</h3>
        </div>
        <p className="text-gray-600 line-clamp-1 text-sm mt-2">{description}</p>
        <Button asChild className="w-full mt-5">
            <Link href={`/product/${id}`}>See more..</Link>
        </Button>
    </div>
  )
}

export function LoadingProductCard() {
    return (
      <div className="flex flex-col">
        <Skeleton className="w-full h-[230px]" />
        <div className="flex flex-col mt-2 gap-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="w-full h-6" />
        </div>
  
        <Skeleton className="w-full h-10 mt-5" />
      </div>
    );
  }