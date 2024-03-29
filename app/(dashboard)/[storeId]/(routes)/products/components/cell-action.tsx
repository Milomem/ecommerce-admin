"use client"

import { useParams, useRouter } from "next/navigation"
import { ProductsColumn } from "./columns"
import { useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"
import { AlertModal } from "@/components/modals/alert-modal"
import { Button } from "@/components/ui/button"
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface CellActionProps {
    data: ProductsColumn
}

export const CellActions: React.FC<CellActionProps> = ({
    data
}) => {
    const params = useParams()
    const router = useRouter()
    const [open , setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const onConfirm = async () => {
        try{
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/products/${data.id}`)
            toast.success('Product deleted.')
            router.refresh()
        } catch (error){
            toast.error('Somenting went wrong.')
        }finally{
            setOpen(false)
            setLoading(false)
        }
    }

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id)
        toast.success('Product ID copied to clipboard.')
    }

    return(
        <>
        <AlertModal isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}  
        loading={loading}
        />
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className=" h-8 w-8 p-0">
                    <span className=" sr-only">Open menu</span>
                    <MoreHorizontal className=" h-4 w-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem  onClick={() => onCopy(data.id)}>
                    <Copy className=" mr-2 w-4 h-4"/>Copy Id
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push(`/${params.storeId}/products/${data.id}`)}>
                    <Edit className="mr-2 h-4 w-4" /> Update
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setOpen(true)}>
                    <Trash className="mr-2 h-4 w-4" /> Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        </>
    )
}