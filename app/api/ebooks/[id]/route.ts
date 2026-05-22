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

    // Build dynamic update query - only update fields that are provided
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (title !== undefined) {
      updates.push(`title = $${paramIndex++}`);
      values.push(title);
    }
    if (category !== undefined) {
      updates.push(`category = $${paramIndex++}`);
      values.push(category);
    }
    if (pages !== undefined) {
      updates.push(`pages = $${paramIndex++}`);
      values.push(pages);
    }
    if (downloads !== undefined) {
      updates.push(`downloads = $${paramIndex++}`);
      values.push(downloads);
    }
    if (status !== undefined) {
      updates.push(`status = $${paramIndex++}`);
      values.push(status);
    }
    if (file_url !== undefined) {
      updates.push(`file_url = $${paramIndex++}`);
      values.push(file_url);
    }

    if (updates.length === 0) {
      return NextResponse.json(
        { error: "No fields to update" },
        { status: 400 },
      );
    }

    updates.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);

    const query = `UPDATE ebooks SET ${updates.join(", ")} WHERE id = $${paramIndex} RETURNING *`;
    const result = await sql(query, values);

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
