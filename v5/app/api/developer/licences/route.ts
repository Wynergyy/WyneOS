import { NextResponse } from "next/server";

let licences: any[] = [];

export async function GET() {
  return NextResponse.json({ licences });
}
