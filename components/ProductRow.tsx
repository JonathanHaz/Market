import { notFound } from "next/navigation";
import {  ProductCard } from "./ProductCard";
import Link from "next/link";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import prisma from "@/app/lib/db";

interface iAppProps {
  category: "newest" | "clothes" | "figures" | "manga";
}

async function getData({ category }: iAppProps) {
  switch (category) {
    case "clothes": {
      const data = await prisma.product.findMany({
        where: {
          category: "clothes",
        },
        select: {
          price: true,
          name: true,
          description: true,
          id: true,
          images: true,
        },
        take: 3,
      });

      return {
        data: data,
        title: "Clothes",
        link: "/products/clothes",
      };
    }
    case "newest": {
      const data = await prisma.product.findMany({
        select: {
          price: true,
          name: true,
          description: true,
          id: true,
          images: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 3,
      });

      return {
        data: data,
        title: "Newest Products",
        link: "/products/all",
      };
    }
    case "figures": {
      const data = await prisma.product.findMany({
        where: {
          category: "figures",
        },
        select: {
          id: true,
          name: true,
          price: true,
          description: true,
          images: true,
        },
        take: 3,
      });

      return {
        title: "Figures",
        data: data,
        link: "/products/figures",
      };
    }
    case "manga": {
      const data = await prisma.product.findMany({
        where: {
          category: "manga",
        },
        select: {
          id: true,
          name: true,
          price: true,
          description: true,
          images: true,
        },
        take: 3,
      });

      return {
        title: "Manga",
        data: data,
        link: "/products/manga",
      };
    }
    default: {
      return notFound();
    }
  }
}

export function ProductRow({ category }: iAppProps) {
  return (
    <section className="mt-12">
      <Suspense fallback={<LoadingState />}>
        <LoadRows category={category} />
      </Suspense>
    </section>
  );
}

async function LoadRows({ category }: iAppProps) {
  const data = await getData({ category: category });
  return (
    <>
      <div className="md:flex md:items-center md:justify-between">
        <h2 className="text-2xl font-extrabold tracking-tighter ">
          {data.title}
        </h2>
        <Link
          href={data.link}
          className="text-sm hidden font-medium text-primary hover:text-primary/90 md:block"
        >
          All Products <span>&rarr;</span>
        </Link>
      </div>

      <div className="grid gird-cols-1 lg:grid-cols-3 sm:grid-cols-2 mt-4 gap-10">
        {data.data.map((product) => (
          <ProductCard
            images={product.images}
            key={product.id}
            id={product.id}
            title={product.name}
            price={product.price}
            description={product.description}
          />
        ))}
      </div>
    </>
  );
}

function LoadingState() {
  return (
    <div>
      <Skeleton className="h-8 w-56" />
      <div className="grid grid-cols-1 sm:grid-cols-2 mt-4 gap-10 lg:grid-cols-3">
        <Skeleton className="w-full h-[300px]" />
        <Skeleton className="w-full h-[300px]" />
        <Skeleton className="w-full h-[300px]" />
      </div>
    </div>
  );
}