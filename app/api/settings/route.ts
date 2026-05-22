import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET() {
  try {
    const settings = await sql`SELECT * FROM settings ORDER BY category, key`;
    const grouped = settings.reduce((acc: any, s: any) => {
      if (!acc[s.category]) acc[s.category] = {};
      acc[s.category][s.key] = s.value;
      return acc;
    }, {});
    return NextResponse.json(grouped);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { key, value } = body;

    if (!key || value === undefined) {
      return NextResponse.json(
        { error: "Key and value required" },
        { status: 400 },
      );
    }

    await sql`
      INSERT INTO settings (key, value)
      VALUES (${key}, ${value})
      ON CONFLICT (key) 
      DO UPDATE SET value = ${value}, updated_at = CURRENT_TIMESTAMP
    `;

    return NextResponse.json({ message: "Setting updated" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
