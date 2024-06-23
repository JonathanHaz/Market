import { ProductRow } from "@/components/ProductRow";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 mt-24">
        <div className="max-w-3xl mx-auto text-2xl sm:text-5xl lg:6xl font-semibold text-center">
          <h1>Find the best Anime merch</h1>
          <h1 className="text-primary text-1xl sm:text-4xl lg:5xl">Clothes, figures & mangas</h1>
          <p className="lg:text-lg text-muted-foreground mx-auto mt-5 w-[90%] font-normal text-base">This is the best place to find the best Anime merch for your next adventure</p>
        </div>
        <ProductRow category="newest" />
        <ProductRow category="clothes" />
        <ProductRow category="figures" />
        <ProductRow category="manga" />
    </div>
  );
}
