import prismadb from "@/lib/prismadb"
import { ProductsColumn } from "./components/columns"
import { ProductsClient } from "./components/client";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";

const ProductsPage = async ({
    params
}: {
    params: {storeId : string}
}) => {
    const products = await prismadb.product.findMany({
        where: {
            storeId : params.storeId
        },
        include : {
            size: true,
            category: true,
            color: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedProducts: ProductsColumn[] = products.map((item) => ({
        id: item.id,
        name: item.name,
        isFeatured: item.isFeatured,
        isArchives: item.isArchives,
        price: formatter.format(item.price.toNumber()),
        category: item.category.name,
        size: item.size.name,
        color: item.color.value,
        createdAt: format(item.createdAt, 'MMMM do, yyyy')
    }))

    return(
        <div className=" flex-col">
            <div className=" flex-1 space-y-4 p-8 pt-6">
                <ProductsClient data={formattedProducts}/>
            </div>
        </div>
    )
}

export default ProductsPage