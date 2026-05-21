import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET() {
  try {
    const eas = await sql`SELECT * FROM expert_advisors ORDER BY id DESC`;
    return NextResponse.json(eas);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch EAs" }, { status: 500 });
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
      win_rate,
      pairs,
      price,
    } = body;

    const result = await sql`
      INSERT INTO expert_advisors (name, platform, version, downloads, status, win_rate, pairs, price)
      VALUES (
        ${name}, ${platform}, ${version}, ${downloads || 0}, 
        ${status || "active"}, ${win_rate || 0}, ${pairs || []}, ${price || "Free"}
      )
      RETURNING *
    `;

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create EA" }, { status: 500 });
  }
}
