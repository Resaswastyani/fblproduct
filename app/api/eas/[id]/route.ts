import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const eas =
      await sql`SELECT * FROM expert_advisors WHERE id = ${params.id}`;
    if (eas.length === 0) {
      return NextResponse.json({ error: "EA not found" }, { status: 404 });
    }
    return NextResponse.json(eas[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch EA" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
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
      UPDATE expert_advisors 
      SET 
        name = COALESCE(${name}, name),
        platform = COALESCE(${platform}, platform),
        version = COALESCE(${version}, version),
        downloads = COALESCE(${downloads}, downloads),
        status = COALESCE(${status}, status),
        win_rate = COALESCE(${win_rate}, win_rate),
        pairs = COALESCE(${pairs}, pairs),
        price = COALESCE(${price}, price),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${params.id}
      RETURNING *
    `;

    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update EA" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    await sql`DELETE FROM expert_advisors WHERE id = ${params.id}`;
    return NextResponse.json({ message: "EA deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete EA" }, { status: 500 });
  }
}
