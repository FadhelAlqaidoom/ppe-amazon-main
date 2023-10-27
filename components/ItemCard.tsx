"use client";

import React, { MouseEventHandler, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import useCart from "@/hooks/use-cart";
import { ItemsTable } from "@/types";

interface CardProps {
  data: ItemsTable;
}

export const ItemCard: React.FC<CardProps> = ({ data }) => {
  const [selectedSize, setSelectedSize] = useState("");
  const [orderQuantity, setOrderQuantity] = useState(1);
  const cart = useCart();

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    cart.addItem(data, selectedSize);
  };

  // Find the selected variant based on the selected size
  const selectedVariant = data.variants.find(
    (variant) => variant.size === selectedSize,
  );

  return (
    <Card>
      <CardHeader>
        <div className="relative h-48 w-full">
          <Image
            src={data.imageUrl}
            alt={data.category}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle className="mb-2 text-xl font-bold">{data.name}</CardTitle>
        <Select onValueChange={(value) => setSelectedSize(value)}>
          <SelectTrigger className="w-full">
            {selectedSize ? (
              <span>{selectedSize}</span>
            ) : (
              <SelectValue placeholder="Select size" />
            )}
          </SelectTrigger>
          <SelectContent>
            {data.variants.map((variant) => (
              <SelectItem
                key={variant.id} // Use a unique identifier instead of the array index
                value={variant.size}
              >
                {variant.size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <CardDescription className="my-2">
          Quantity Available: {selectedVariant ? selectedVariant.quantity : 0}
        </CardDescription>
        <div className="my-2">
          <label
            htmlFor="orderQuantity"
            className="block text-sm font-medium text-gray-700"
          >
            Order Quantity
          </label>
          <Input
            id="orderQuantity"
            type="number"
            value={orderQuantity}
            onChange={(e) => setOrderQuantity(Number(e.target.value))}
            min={1}
            max={selectedVariant ? selectedVariant.quantity : 0}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onAddToCart} className="w-full">
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
};
