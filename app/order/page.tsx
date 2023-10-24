import React from "react";
import { CategoriesTabs } from "@/components/CategoriesTabs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const fetchCategories = async () => {
  let categories = await prisma.category.findMany();
  return categories;
};

const fetchItems = async () => {
  let items = await prisma.product.findMany();
  return items;
};

// const categories = [
//   { value: "HAND_PROTECTION", label: "Hand protection" },
//   { value: "eye_protection", label: "Eye protection" },
//   { value: "head_protection", label: "Head protection" },
//   { value: "safety_arc_suit", label: "Safety Arc Suit" },
//   { value: "others", label: "Others" },
// ];

// const items = [
//   {
//     photoUrl: "/glovesimg.jpeg",
//     name: "Item 1",
//     sizeOptions: ["Small", "Medium", "Large"],
//     quantityAvailable: 10,
//     category: "HEAD_PROTECTION",
//   },
//   {
//     photoUrl: "/glovesimg.jpeg",
//     name: "Item 1",
//     sizeOptions: ["Small", "Medium", "Large"],
//     quantityAvailable: 10,
//     category: "HAND_PROTECTION",
//   },
//   {
//     photoUrl: "/glovesimg.jpeg",
//     name: "Item 1",
//     sizeOptions: ["Small", "Medium", "Large"],
//     quantityAvailable: 10,
//     category: "FACE_PROTECTION",
//   },
//   {
//     photoUrl: "/glovesimg.jpeg",
//     name: "Item 1",
//     sizeOptions: ["Small", "Medium", "Large"],
//     quantityAvailable: 10,
//     category: "HAND_PROTECTION",
//   },
//   {
//     photoUrl: "/glovesimg.jpeg",
//     name: "Item 1",
//     sizeOptions: ["Small", "Medium", "Large"],
//     quantityAvailable: 10,
//     category: "HAND_PROTECTION",
//   },
//   {
//     photoUrl: "/glovesimg.jpeg",
//     name: "Item 1",
//     sizeOptions: ["Small", "Medium", "Large"],
//     quantityAvailable: 10,
//     category: "HAND_PROTECTION",
//   },
// ];

const Order = async () => {
  const fetchedCategories = await fetchCategories();
  const fetchedItems = await fetchItems();

  // Map fetched data to expected shape
  const categories = fetchedCategories.map((category) => ({
    value: category.name,
    label: category.name.replaceAll("_", " "),
  }));
  const items = fetchedItems.map((item) => ({
    id: item.id,
    name: item.name,
    sizeOptions: [item.size],
    quantityAvailable: item.quantity,
    category: item.categoryName,
    imageUrl: item.imageUrl,
  }));

  return (
    <div className="flex min-h-screen flex-col items-start px-4 pt-20">
      <div className="mx-auto w-full max-w-7xl">
        <CategoriesTabs categories={categories} items={items} />
      </div>
    </div>
  );
};

export default Order;
