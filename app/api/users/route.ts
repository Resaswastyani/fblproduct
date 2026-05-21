import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET() {
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
      GROUP BY u.id
      ORDER BY u.id DESC
    `;
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, status, plan, downloads } = body;

    const result = await sql`
      INSERT INTO users (name, email, status, plan, downloads)
      VALUES (${name}, ${email}, ${status || "Active"}, ${plan || "Free"}, ${downloads || 0})
      RETURNING *
    `;

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 },
    );
  }
}
