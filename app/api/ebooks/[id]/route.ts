import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const ebooks = await sql`SELECT * FROM ebooks WHERE id = ${id}`;
    if (ebooks.length === 0) {
      return NextResponse.json({ error: "Ebook not found" }, { status: 404 });
    }
    return NextResponse.json(ebooks[0]);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, category, pages, downloads, status, file_url } = body;

    // Get current ebook data first
    const current = await sql`SELECT * FROM ebooks WHERE id = ${id}`;
    if (current.length === 0) {
      return NextResponse.json({ error: "Ebook not found" }, { status: 404 });
    }

    const existing = current[0];

    // Use tagged template literal with coalesce - pass the new value or existing value
    const result = await sql`
      UPDATE ebooks 
      SET 
        title = ${title !== undefined ? title : existing.title},
        category = ${category !== undefined ? category : existing.category},
        pages = ${pages !== undefined ? pages : existing.pages},
        downloads = ${downloads !== undefined ? downloads : existing.downloads},
        status = ${status !== undefined ? status : existing.status},
        file_url = ${file_url !== undefined ? file_url : existing.file_url},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;

    return NextResponse.json(result[0]);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await sql`DELETE FROM ebooks WHERE id = ${id}`;
    return NextResponse.json({ message: "Ebook deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
