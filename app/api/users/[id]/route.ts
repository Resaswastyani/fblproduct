import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const users = await sql`
      SELECT 
        u.*,
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
      WHERE u.id = ${params.id}
      GROUP BY u.id
    `;

    if (users.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(users[0]);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const body = await request.json();
    const { name, email, status, products } = body;

    // Update user
    const result = await sql`
      UPDATE users 
      SET 
        name = COALESCE(${name}, name),
        email = COALESCE(${email}, email),
        status = COALESCE(${status}, status),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${params.id}
      RETURNING *
    `;

    // Update products kalau ada
    if (products && Array.isArray(products)) {
      await sql`DELETE FROM user_products WHERE user_id = ${params.id}`;
      for (const product of products) {
        await sql`
          INSERT INTO user_products (user_id, product_type, product_id)
          VALUES (${params.id}, ${product.type}, ${product.id})
        `;
      }
    }

    return NextResponse.json(result[0]);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    await sql`DELETE FROM users WHERE id = ${params.id}`;
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
