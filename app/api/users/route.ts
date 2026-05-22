import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { hashPassword } from "@/lib/auth";

export async function GET() {
  try {
    const users = await sql`
      SELECT 
        u.id, u.name, u.email, u.date, u.status, u.role,
        COALESCE(
          json_agg(
            json_build_object(
              'type', up.product_type,
              'id', up.product_id
            )
          ) FILTER (WHERE up.id IS NOT NULL),
          '[]'
        ) as products
      FROM users u
      LEFT JOIN user_products up ON u.id = up.user_id
      GROUP BY u.id
      ORDER BY u.id DESC
    `;
    return NextResponse.json(users);
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, status, role, password, products } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password required" },
        { status: 400 },
      );
    }

    const hashedPassword = hashPassword(password);

    const result = await sql`
      INSERT INTO users (name, email, password, role, status)
      VALUES (${name}, ${email}, ${hashedPassword}, ${role || "member"}, ${status || "Active"})
      RETURNING id, name, email, date, status, role
    `;

    const userId = result[0].id;

    if (products && Array.isArray(products)) {
      for (const product of products) {
        await sql`
          INSERT INTO user_products (user_id, product_type, product_id)
          VALUES (${userId}, ${product.type}, ${product.id})
          ON CONFLICT (user_id, product_type, product_id) DO NOTHING
        `;
      }
    }

    return NextResponse.json(result[0], { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
