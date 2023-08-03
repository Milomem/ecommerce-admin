"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellActions } from "./cell-action"

export type ProductsColumn = {
    id: string
    name: string
    price: string
    size: string
    category: string
    color: string
    isFeatured: boolean
    isArchives: boolean
    createdAt: string
}

export const columns: ColumnDef<ProductsColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => (
      <div className=" flex items-center gap-x-2">
        {row.original.color}
        <div
        className=" h-6 w-6 rounded-full border"
        style={{backgroundColor: row.original.color}}
        />
      </div>
    )
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "isArchives",
    header: "Archives",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellActions data={row.original} />
  },
];