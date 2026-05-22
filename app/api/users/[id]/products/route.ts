import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const ebooks = await sql`
      SELECT e.*, 'ebook' as type 
      FROM ebooks e
      JOIN user_products up ON e.id = up.product_id AND up.product_type = 'ebook'
      WHERE up.user_id = ${params.id}
    `;

    const eas = await sql`
      SELECT ea.*, 'ea' as type 
      FROM expert_advisors ea
      JOIN user_products up ON ea.id = up.product_id AND up.product_type = 'ea'
      WHERE up.user_id = ${params.id}
    `;

    const indicators = await sql`
      SELECT i.*, 'indicator' as type 
      FROM indicators i
      JOIN user_products up ON i.id = up.product_id AND up.product_type = 'indicator'
      WHERE up.user_id = ${params.id}
    `;

    return NextResponse.json({ ebooks, eas, indicators });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const body = await request.json();
    const { products } = body;

    if (!Array.isArray(products)) {
      return NextResponse.json(
        { error: "Products must be an array" },
        { status: 400 },
      );
    }

    await sql`DELETE FROM user_products WHERE user_id = ${params.id}`;

    for (const product of products) {
      await sql`
        INSERT INTO user_products (user_id, product_type, product_id)
        VALUES (${params.id}, ${product.type}, ${product.id})
        ON CONFLICT (user_id, product_type, product_id) DO NOTHING
      `;
    }

    return NextResponse.json({ message: "Products assigned successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
