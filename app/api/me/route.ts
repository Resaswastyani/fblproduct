import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { hashPassword, verifyPassword } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id)
      return NextResponse.json({ error: "ID required" }, { status: 400 });

    const users = await sql`
      SELECT id, name, email, role, date, status, created_at
      FROM users WHERE id = ${id}
    `;
    if (users.length === 0)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json(users[0]);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id)
      return NextResponse.json({ error: "ID required" }, { status: 400 });

    const body = await request.json();
    const { name, email, currentPassword, newPassword } = body;

    const current = await sql`SELECT * FROM users WHERE id = ${id}`;
    if (current.length === 0)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    let updatedPassword = current[0].password;

    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json(
          { error: "Current password required" },
          { status: 400 },
        );
      }
      if (!verifyPassword(currentPassword, current[0].password)) {
        return NextResponse.json(
          { error: "Current password is incorrect" },
          { status: 400 },
        );
      }
      updatedPassword = hashPassword(newPassword);
    }

    const result = await sql`
      UPDATE users 
      SET 
        name = COALESCE(${name}, name),
        email = COALESCE(${email}, email),
        password = ${updatedPassword},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING id, name, email, role, date, status
    `;

    return NextResponse.json(result[0]);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
