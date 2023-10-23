"use client";

import React, { useState } from "react";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ItemCard } from "@/components/ItemCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { item } from "@/types";

interface Category {
  value: string;
  label: string;
}

interface TabsProps {
  categories: Category[];
  items: item[];
}

export const CategoriesTabs: React.FC<TabsProps> = ({ categories, items }) => {
  // const selectedTab = "HAND_PROTECTION";
  // const filteredItems = items.filter((item) => item.category === selectedTab);

  return (
    <div>
      <Tabs defaultValue={""}>
        <ScrollArea className="max-w-full lg:max-w-none">
          <TabsList className="flex ">
            {categories.map((category, index) => (
              <TabsTrigger
                key={index}
                value={category.value}
                className="p-auto w-full sm:w-full"
              >
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 ">
          {items.map((item, index) => (
            <TabsContent key={index} value={item.category}>
              <ItemCard key={index} data={item} />
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
};
