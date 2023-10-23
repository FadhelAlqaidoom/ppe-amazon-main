import { Button } from "@/components/ui/button";
import { itemstable, columns } from "./columns";
import { DataTable } from "./data-table";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const fetchItems = async () => {
  let items = await prisma.product.findMany();
  return items;
};

async function getData(): Promise<itemstable[]> {
  const fetchedItems = await fetchItems();
  const items = fetchedItems.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    unitCost: item.unitCost,
    quantity: item.quantity,
    category: item.categoryName,
    size: item.size,
    site: item.siteName,
  }));
  return items;
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto bg-white py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
