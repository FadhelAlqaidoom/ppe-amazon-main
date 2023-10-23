import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { createItemSchema } from "../route";

// delete table
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const item = await prismadb.product.findUnique({
      where: { id: params.id },
    });

    if (!item)
      return NextResponse.json({ error: "Invalid item" }, { status: 404 });

    await prismadb.product.delete({
      where: { id: item.id },
    });

    return NextResponse.json(item, { status: 200 });
  } catch (error) {
    console.error("Error deleting item:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const body = await request.json();
  const validation = createItemSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const item = prismadb.product.findUnique({
    where: { id: params.id },
  });
  if (!item)
    return NextResponse.json({ error: "Invalid item" }, { status: 404 });

  const updatedItem = await prismadb.product.update({
    where: {
      id: params.id,
    },
    data: {},
  });
  return NextResponse.json(updatedItem);
}
