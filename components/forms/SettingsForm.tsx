"use client"

import { useFormState } from "react-dom"
import { SubmitButtons } from "../SubmitButtons"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { type State, UpdateUserSettings } from "@/app/actions"
import { useEffect } from "react"
import { toast } from "sonner"

interface SettingsFormProps {
    firstName: string;
    lastName: string;
    email: string;
}

export function SettingsForm({firstName, lastName, email}: SettingsFormProps) {
    const intialState: State = {message: "", status: undefined}
    const [state, formAction] = useFormState(UpdateUserSettings, intialState)

    useEffect(() => {
        if(state?.status === "error") {
            toast.error(state.message)
        } else if(state?.status === "success") {
            toast.success(state.message)
        }
    },[state])
  return (
    <form action={formAction} >
        <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>
                Here you will find settings regarding your account
            </CardDescription>
        </CardHeader>
        <CardContent className="flex-col flex gap-y-5">
            <div className="flex flex-col gap-y-2">
                <Label>First Name</Label>
                <Input name="firstName" type="text" defaultValue={firstName}/>
            </div>

            <div className="flex flex-col gap-y-2">
                <Label>Last Name</Label>
                <Input name="lastName" type="text" defaultValue={lastName}/>
            </div>

            <div className="flex flex-col gap-y-2">
                <Label>Email</Label>
                <Input name="email" type="text" disabled defaultValue={email}/>
            </div>
        </CardContent>
        <CardFooter>
            <SubmitButtons title="Save Changes"/>
        </CardFooter>
    </form>
  )
}
