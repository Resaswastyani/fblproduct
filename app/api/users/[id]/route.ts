import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { hashPassword } from "@/lib/auth";

// FIX: Helper untuk ekstrak ID dari URL karena params kadang bermasalah di Vercel
function getIdFromUrl(request: Request): string | null {
  const url = new URL(request.url);
  const pathParts = url.pathname.split("/");
  const id = pathParts[pathParts.length - 1];
  // Pastikan ID adalah number
  if (!id || isNaN(Number(id))) return null;
  return id;
}

export async function GET(request: Request) {
  try {
    const id = getIdFromUrl(request);
    if (!id) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

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
      WHERE u.id = ${id}
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

export async function PUT(request: Request) {
  try {
    const id = getIdFromUrl(request);
    if (!id) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const body = await request.json();
    const { name, email, status, role, password } = body;

    // FIX: Cek user exists dulu
    const current = await sql`SELECT * FROM users WHERE id = ${id}`;
    if (current.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const updatedName = name !== undefined ? name : current[0].name;
    const updatedEmail = email !== undefined ? email : current[0].email;
    const updatedStatus = status !== undefined ? status : current[0].status;
    const updatedRole = role !== undefined ? role : current[0].role;
    const updatedPassword = password
      ? hashPassword(password)
      : current[0].password;

    const result = await sql`
      UPDATE users 
      SET 
        name = ${updatedName},
        email = ${updatedEmail},
        status = ${updatedStatus},
        role = ${updatedRole},
        password = ${updatedPassword},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING id, name, email, date, status, role
    `;

    return NextResponse.json(result[0]);
  } catch (error: any) {
    console.error("PUT Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const id = getIdFromUrl(request);
    if (!id) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await sql`DELETE FROM users WHERE id = ${id}`;
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
