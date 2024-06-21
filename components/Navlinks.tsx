"use client"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const Links = [
    {id: 1, name: "Home", href: "/"},
    {id: 2, name: "Clothes", href: "/products/clothes"},
    {id: 3, name: "Figures", href: "/products/figures"},
    {id: 4, name: "Manga", href: "/products/manga"},
]

export function Navlinks(){
    const location = usePathname()
    return (
        <div className="hidden md:flex justify-center items-center col-span-6 gap-x-2">
            {Links.map((link) => (
                <Link href={link.href} key={link.id} className={cn(
                    location === link.href ? "text-primary" : "hover:text-primary/80", 'group flex items-center px-2 py-2 font-medium rounded-md:'
                )}>
                    {link.name}
                </Link>
            ))}
        </div>
    )
}