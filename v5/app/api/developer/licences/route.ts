/**
 * Developer Licence Listing API (WyneOS v5)
 * Returns a placeholder list of developer licences.
 */

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    timestamp: Date.now(),
    licences: []
  });
}
