"use client"
import { categoryItems } from "@/app/lib/categoryItems";
import { Card, CardHeader } from "./ui/card";
import { useState } from "react";

export default function SelectCategory() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <input type="hidden" name="category" value={selectedCategory || ""} />
        {categoryItems.map((item) => (
            <div key={item.id} className="cursor-pointer">
                <Card className={selectedCategory === item.name ? "bg-primary text-primary-foreground" : ""} onClick={()=>setSelectedCategory(item.name)}>
                    <CardHeader>{item.image} <h3 className="font-medium">{item.title}</h3></CardHeader>
                </Card>
            </div>
        ))}
    </div>
  )
}
