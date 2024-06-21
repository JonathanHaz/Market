import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Link from "next/link";
import { CircleDollarSign, Settings } from "lucide-react";

interface UserNavProps {
    email: string;
    name: string;
    userImage: string | undefined;
}

 export function UserNav({email, name, userImage}: UserNavProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"ghost"} className="relative h-10 w-10 rounded-full">
                   <Avatar className="h-10 w-10">
                    <AvatarImage src={userImage} alt="Avatar Image"/>
                   <AvatarFallback>{name.slice(0, 3)}</AvatarFallback>
                   </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{email}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild><Link href="/sell"><CircleDollarSign className="mr-2 h-4 w-4" />Sell Product</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/my-products">My Products</Link></DropdownMenuItem>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/settings"><Settings className="mr-2 h-4 w-4" />Settings</Link></DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <LogoutLink>Logout</LogoutLink>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}