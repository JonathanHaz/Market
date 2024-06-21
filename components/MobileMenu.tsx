"use client"
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Links } from "./Navlinks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function MobileMenu() {
    const location = usePathname()
    return (
        <Sheet>
           <SheetTrigger asChild>
            <Button variant={"outline"} size={'icon'}>
                <Menu className="w-4 h-4"/>
            </Button>
           </SheetTrigger>
           <SheetContent>
            <div className="mt-5 flex px-2 space-y-1 flex-col">
                {Links.map((link) => (
                    <Link key={link.id} href={link.href} className={cn(
                        location === link.href ? "bg-muted" : "hover:bg-muted bg-opacity-80", 'group flex items-center px-2 py-2 font-medium rounded-md:'
                    )}>
                        {link.name}
                    </Link>
                ))}
            </div>
           </SheetContent>
        </Sheet>
    )
}