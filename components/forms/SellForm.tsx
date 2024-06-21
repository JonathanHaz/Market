"use client"

import { SellProduct, State } from "@/app/actions";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import SelectCategory from "../SelectCategory";
import { Textarea } from "../ui/textarea";
import { UploadDropzone } from "@/app/lib/uploadthing";
import { SubmitButtons } from "../SubmitButtons";

export function SellForm() {
    const intialState: State = {message: "", status: undefined}
    const [state, formAction] = useFormState(SellProduct, intialState)
    const [images, setImages] = useState<null | string[]>(null)
  
    useEffect(() => {
      if (state.status === "success") {
        toast.success(state.message || "Product successfully submitted!");
        redirect("/");
      } else if (state.status === "error") {
        toast.error(state.message || "An error occurred while submitting the product.");
      }
    }, [state]);
  return (
       <form action={formAction}>
            <CardHeader>
                <CardTitle>Sell your product with ease</CardTitle>
                <CardDescription>Please describe your product in details so it can be sold.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-y-10">
                <div className="flex flex-col gap-y-2">
                <Label>Name</Label>
                <Input name="name" type="text" placeholder="Product Name"/>
                {state?.errors?.['name']?.[0] && (
                  <p className="text-destructive">{state?.errors?.['name']?.[0]}</p>
                )}
                </div>
                <div className="flex flex-col gap-y-2">
                  <Label>Category</Label>
                  <SelectCategory/>
                  {state?.errors?.['category']?.[0] && (
                  <p className="text-destructive">{state?.errors?.['category']?.[0]}</p>
                )}
                </div>
                <div className="flex flex-col gap-y-2">
                  <Label>Price</Label>
                <Input name="price" type="number" placeholder="$"/>
                {state?.errors?.['price']?.[0] && (
                  <p className="text-destructive">{state?.errors?.['price']?.[0]}</p>
                )}
                </div>
                <div className="flex flex-col gap-y-2">
                  <Label>Description</Label>
                  <Textarea name="description" maxLength={300 } placeholder="Product Description..."/>
                  {state?.errors?.['description']?.[0] && (
                  <p className="text-destructive">{state?.errors?.['description']?.[0]}</p>
                )}
                </div>
                <div className="flex flex-col gap-y-2">
                  <input type="hidden" name="images" value={JSON.stringify(images)} />
                  <Label>Product Images</Label>
                  <UploadDropzone endpoint="imageUploader"
                  onClientUploadComplete={(res)=>{
                    setImages(res.map((item)=> item.url))
                    toast.success("Image uploaded successfully")
                  }}
                  onUploadError={(error: Error)=>{
                    toast.error("Error uploading image")
                    throw new Error(`${error}`)
                  }}
                  />
                  {state?.errors?.['images']?.[0] && (
                    <p className="text-destructive">{state?.errors?.['images']?.[0]}</p>
                  )}
                </div>
            </CardContent>
            <CardFooter className="mt-5 justify-end">
              <SubmitButtons title="Create Product"/>
            </CardFooter>
        </form>
  )
}
