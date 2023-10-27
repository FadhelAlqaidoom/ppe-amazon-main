import React from "react";
import { CategoriesTabs } from "@/components/CategoriesTabs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const fetchCategories = async () => {
  let categories = await prisma.category.findMany();
  return categories;
};

const fetchItems = async () => {
  let items = await prisma.product.findMany({
    include: {
      variants: true, // Include related ProductVariant records
    },
  });
  return items;
};

const Order = async () => {
  const fetchedCategories = await fetchCategories();
  const fetchedItems = await fetchItems();

  // Map fetched data to expected shape
  const categories = fetchedCategories.map((category) => ({
    value: category.name,
    label: category.name.replaceAll("_", " "),
  }));
  const items = fetchedItems.map((item) => {
    const sizeOptions = item.variants.map((variant) => variant.size);
    const totalQuantity = item.variants.reduce(
      (sum, variant) => sum + variant.quantity,
      0,
    );

    return {
      id: item.id,
      name: item.name,
      description: item.description, // Include description property
      unitCost: item.unitCost, // Include unitCost property
      sizeOptions, // size options from variants
      quantityAvailable: totalQuantity, // total quantity across all variants
      category: item.categoryName,
      site: item.siteName, // Assume siteName is the correct property on item
      imageUrl: item.imageUrl,
      variants: item.variants, // Include variants property
    };
  });

  return (
    <div className="flex min-h-screen flex-col items-start px-4 pt-20">
      <div className="mx-auto w-full max-w-7xl">
        <CategoriesTabs categories={categories} items={items} />
      </div>
    </div>
  );
};

export default Order;
