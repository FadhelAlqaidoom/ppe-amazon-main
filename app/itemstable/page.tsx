import { Button } from "@/components/ui/button";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const fetchItems = async () => {
  let items = await prisma.product.findMany({
    include: {
      variants: true,
    },
  });
  return items;
};

interface Variant {
  size: string;
  quantity: number;
}

interface ItemsTable {
  id: string;
  name: string;
  description: string;
  unitCost: number;
  variants: Variant[];
  category: string;
  site: string;
}

async function getData(): Promise<ItemsTable[]> {
  const fetchedItems = await fetchItems();
  const items = fetchedItems.map((item) => ({
    id: item.id,
    imageUrl: item.imageUrl,
    name: item.name,
    description: item.description,
    unitCost: item.unitCost,
    variants: item.variants.map((variant: any) => ({
      size: variant.size,
      quantity: variant.quantity,
    })),
    category: item.categoryName,
    site: item.siteName,
  }));
  return items;
}

export default async function ItemsPage() {
  const data = await getData();

  return (
    <div className="container mx-auto bg-white py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
