import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET() {
  try {
    const indicators = await sql`SELECT * FROM indicators ORDER BY id DESC`;
    return NextResponse.json(indicators);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      platform,
      version,
      downloads,
      status,
      price,
      updated_at,
      file_url,
    } = body;

    const result = await sql`
      INSERT INTO indicators (name, platform, version, downloads, status, price, updated_at, file_url)
      VALUES (
        ${name}, ${platform}, ${version}, ${downloads || 0}, 
        ${status || "active"}, ${price || "Free"}, ${updated_at || new Date().toISOString().split("T")[0]}, ${file_url || null}
      )
      RETURNING *
    `;

    return NextResponse.json(result[0], { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
