/**
 * Licence Creation API (WyneOS v5)
 * Provides a safe placeholder endpoint for creating general licences.
 */

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));

    return NextResponse.json({
      ok: true,
      timestamp: Date.now(),
      message: "Licence created (placeholder)",
      received: body
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request" },
      { status: 400 }
    );
  }
}
