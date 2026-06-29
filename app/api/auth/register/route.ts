import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { hashPassword } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "All fields required" },
        { status: 400 },
      );
    }

    const hashedPassword = hashPassword("");

    const result = await sql`
      INSERT INTO users (name, email, password, role, status)
      VALUES (${name}, ${email}, ${hashedPassword}, 'member', 'Active')
      RETURNING id, name, email, role, status, date
    `;

    return NextResponse.json({ user: result[0] }, { status: 201 });
  } catch (error: any) {
    if (
      error.message.includes("unique constraint") ||
      error.message.includes("already exists")
    ) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 409 },
      );
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
