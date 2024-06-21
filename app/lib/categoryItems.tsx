import { Book, Footprints, PersonStanding, Shirt } from "lucide-react"
import { ReactNode } from "react"

interface categoryProps{
    name: string
    title: string
    image: ReactNode
    id: number
}

export const categoryItems: categoryProps[] = [
    {
        id: 1,
        name: "clothes",
        title: "Clothes",
        image: <Shirt/>,
    },
    {
        id: 2,
        name: "figures",
        title: "Figures",
        image: <PersonStanding/>,
    },
    {
        id: 3,
        name: "manga",
        title: "Manga",
        image: <Book />,
    },
]