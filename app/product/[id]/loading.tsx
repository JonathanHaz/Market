import { LoadingProductCard } from "@/components/ProductCard";


export default function loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-10">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-10">
            <div className="cols-span-1">
            <LoadingProductCard />
            <LoadingProductCard />
            </div>
            <div className="cols-span-1">
            <LoadingProductCard />

            </div>
        </div>
    </div>
  )
}
