"use client"

import { useParams, useRouter } from "next/navigation"
import { CategoryColumn, columns } from "./columns"
import { Heading } from "@/components/ui/heading"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list";


interface CategoryClientProps {
    data: CategoryColumn[]
}

export const CategoryClient: React.FC<CategoryClientProps> = ({
    data
}) => {
    const params = useParams()
    const router = useRouter()

    return(
        <>
        <div className=" flex items-center justify-between">
            <Heading title={`Category (${data.length})`} description="Manage categories for your store"/>
            <Button onClick={() => router.push(`/${params.storeId}/categories/new`)}>
                <Plus className=" mr-2 h-4 w-4"/>Add new
            </Button>
        </div>
        <Separator/>
        <DataTable searchKey="name" columns={columns} data={data}/>
        <Heading title="API" description="API Calls for Categories"/>
        <Separator/>
        <ApiList entityName="categories" entityIdName="categoryId"/>
        </>
    )
}