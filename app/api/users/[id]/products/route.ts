import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

function getIdFromUrl(request: Request): string | null {
  const url = new URL(request.url);
  const pathParts = url.pathname.split("/");
  // URL format: /api/users/123/products
  // Cari index "users" lalu ambil index+1
  const usersIndex = pathParts.indexOf("users");
  if (usersIndex === -1 || !pathParts[usersIndex + 1]) return null;
  const id = pathParts[usersIndex + 1];
  if (isNaN(Number(id))) return null;
  return id;
}

export async function GET(request: Request) {
  try {
    const id = getIdFromUrl(request);
    if (!id) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const ebooks = await sql`
      SELECT e.*, 'ebook' as type 
      FROM ebooks e
      JOIN user_products up ON e.id = up.product_id AND up.product_type = 'ebook'
      WHERE up.user_id = ${id}
    `;

    const eas = await sql`
      SELECT ea.*, 'ea' as type 
      FROM expert_advisors ea
      JOIN user_products up ON ea.id = up.product_id AND up.product_type = 'ea'
      WHERE up.user_id = ${id}
    `;

    const indicators = await sql`
      SELECT i.*, 'indicator' as type 
      FROM indicators i
      JOIN user_products up ON i.id = up.product_id AND up.product_type = 'indicator'
      WHERE up.user_id = ${id}
    `;

    return NextResponse.json({ ebooks, eas, indicators });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const id = getIdFromUrl(request);
    if (!id) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const body = await request.json();
    const { products } = body;

    if (!Array.isArray(products)) {
      return NextResponse.json(
        { error: "Products must be an array" },
        { status: 400 },
      );
    }

    await sql`DELETE FROM user_products WHERE user_id = ${id}`;

    for (const product of products) {
      await sql`
        INSERT INTO user_products (user_id, product_type, product_id)
        VALUES (${id}, ${product.type}, ${product.id})
      `;
    }

    return NextResponse.json({ message: "Products assigned successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
