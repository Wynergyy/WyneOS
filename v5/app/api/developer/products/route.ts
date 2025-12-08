import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    ok: true,
    products: []
  });
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body = await req.json();

    return NextResponse.json({
      ok: true,
      received: body
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: "Invalid JSON payload"
      },
      { status: 400 }
    );
  }
}
