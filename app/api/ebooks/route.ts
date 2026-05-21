import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET() {
  try {
    const ebooks = await sql`SELECT * FROM ebooks ORDER BY id DESC`;
    return NextResponse.json(ebooks);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch ebooks" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, category, pages, downloads, status } = body;

    const result = await sql`
      INSERT INTO ebooks (title, category, pages, downloads, status)
      VALUES (${title}, ${category}, ${pages || 0}, ${downloads || 0}, ${status || "draft"})
      RETURNING *
    `;

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create ebook" },
      { status: 500 },
    );
  }
}
