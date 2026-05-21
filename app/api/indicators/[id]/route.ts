import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const indicators =
      await sql`SELECT * FROM indicators WHERE id = ${params.id}`;
    if (indicators.length === 0) {
      return NextResponse.json(
        { error: "Indicator not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(indicators[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch indicator" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const body = await request.json();
    const { name, platform, version, downloads, status, price, updated_at } =
      body;

    const result = await sql`
      UPDATE indicators 
      SET 
        name = COALESCE(${name}, name),
        platform = COALESCE(${platform}, platform),
        version = COALESCE(${version}, version),
        downloads = COALESCE(${downloads}, downloads),
        status = COALESCE(${status}, status),
        price = COALESCE(${price}, price),
        updated_at = COALESCE(${updated_at}, updated_at),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${params.id}
      RETURNING *
    `;

    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update indicator" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    await sql`DELETE FROM indicators WHERE id = ${params.id}`;
    return NextResponse.json({ message: "Indicator deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete indicator" },
      { status: 500 },
    );
  }
}
