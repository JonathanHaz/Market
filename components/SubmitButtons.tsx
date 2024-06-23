"use client"

import { useFormStatus } from "react-dom"
import { Button } from "./ui/button"
import { Loader2 } from "lucide-react"

export function SubmitButtons({title}: {title: string}) {
    const {pending} = useFormStatus()
  return (
    <>
    {pending ? (
        <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
            Please wait..
        </Button>
    ): (
        <Button type="submit">
            {title}
        </Button>
    )}
    </>
  )
};

interface BuyButtonProps {
    price: number;
    type?: string;
    size?: string;
    className?: string;
    children?: string | number | undefined;
  }
  

  export function BuyButton({ price, type = "submit", size = "lg", className = "w-full mt-10", children }: BuyButtonProps) {
    const { pending } = useFormStatus();

    return(
        <>
        {pending ? (
            <Button disabled size={"lg"} className="w-full mt-10">
                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                Please wait..
            </Button>
        ): (
            <Button type="submit" size={"lg"} className="w-full mt-10">
                Buy for ${price}
            </Button>
        )}
        </>
    )
}