"use client"

import { useParams, useRouter } from "next/navigation"
import { ProductsColumn, columns } from "./columns"
import { Heading } from "@/components/ui/heading"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list";


interface ProductsClientProps {
    data: ProductsColumn[]
}

export const ProductsClient: React.FC<ProductsClientProps> = ({
    data
}) => {
    const params = useParams()
    const router = useRouter()

    return(
        <>
        <div className=" flex items-center justify-between">
            <Heading title={`Products (${data.length})`} description="Manage sroducts for your store"/>
            <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
                <Plus className=" mr-2 h-4 w-4"/>Add new
            </Button>
        </div>
        <Separator/>
        <DataTable searchKey="name" columns={columns} data={data}/>
        <Heading title="API" description="API Calls for Products"/>
        <Separator/>
        <ApiList entityName="products" entityIdName="productId"/>
        </>
    )
}