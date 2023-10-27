import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prismadb from "@/lib/prismadb";

// Update the schema to include a variants array
export const createItemSchema = z.object({
  name: z.string().min(1).max(32),
  description: z.string().min(0),
  category: z.enum([
    "SAFETY_VEST",
    "EYE_PROTECTION",
    "HEAD_PROTECTION",
    "TOE_PROTECTION",
    "HAND_PROTECTION",
    "FACE_PROTECTION",
    "FALL_PROTECTION",
    "KNEE_PROTECTION",
    "SAFETY_ARC_SUIT",
  ]),
  site: z.enum(["BAH52", "BAH53", "BAH54"]),
  unitCost: z.number(),
  imageUrl: z.string(),
  variants: z.array(
    z.object({
      size: z.string().min(1).max(2),
      quantity: z.number(),
    }),
  ),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = createItemSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(validation.error.errors, { status: 400 });
    }

    // Use validated data from Zod schema parsing
    const newProduct = await prismadb.product.create({
      data: {
        ...validation.data,
        category: {
          connect: { name: validation.data.category },
        },
        site: {
          connect: { name: validation.data.site },
        },
        variants: {
          create: validation.data.variants,
        },
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
