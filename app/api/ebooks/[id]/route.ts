import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const ebooks = await sql`SELECT * FROM ebooks WHERE id = ${params.id}`;
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
  { params }: { params: { id: string } },
) {
  try {
    const body = await request.json();
    const { title, category, pages, downloads, status, file_url } = body;

    const result = await sql`
      UPDATE ebooks 
      SET 
        title = COALESCE(${title}, title),
        category = COALESCE(${category}, category),
        pages = COALESCE(${pages}, pages),
        downloads = COALESCE(${downloads}, downloads),
        status = COALESCE(${status}, status),
        file_url = COALESCE(${file_url}, file_url),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${params.id}
      RETURNING *
    `;

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
    await sql`DELETE FROM ebooks WHERE id = ${params.id}`;
    return NextResponse.json({ message: "Ebook deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
