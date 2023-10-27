"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ItemsTable, Variant } from "@/types";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type DeleteButtonProps = {
  itemId: string;
};

const DeleteButton: React.FC<DeleteButtonProps> = ({ itemId }) => {
  const router = useRouter();
  const handleDelete = async () => {
    await axios.delete("/api/items/" + itemId);
    router.refresh();
  };

  return <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>;
};

export const columns: ColumnDef<ItemsTable>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Item Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("name")}</div>;
    },
    accessorFn: (row) => row.name,
  },
  {
    accessorKey: "description",
    header: "Item Description",
    accessorFn: (row) => row.description,
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorFn: (row) => row.category,
  },
  {
    accessorKey: "site",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Site
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorFn: (row) => row.site,
  },
  {
    accessorKey: "variants",
    header: "Sizes and Quantities",
    cell: ({ row }) => {
      const variants = row.getValue("variants") as Variant[]; // Type assertion here
      return (
        <div>
          {variants.map((variant, index) => (
            <div key={index}>{`${variant.size}: ${variant.quantity}`}</div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "unitCost",
    header: "Unit Cost",
  },
  {
    accessorKey: "size",
    header: "Item Size",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const item = row.original; // Access the row data

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-8 w-8 p-0">
              {" "}
              {/* Adjusted Button */}
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DeleteButton itemId={item.id} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
