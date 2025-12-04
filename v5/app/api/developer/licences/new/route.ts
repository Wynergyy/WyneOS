import { NextResponse } from "next/server";

let licences: any[] = [];

export async function POST(req: Request) {
  const { customer, productId, durationYears } = await req.json();

  if (!customer || !productId || !durationYears) {
    return NextResponse.json({ ok: false, message: "Missing fields" }, { status: 400 });
  }

  const licence = {
    id: crypto.randomUUID(),
    customer,
    product: productId,
    durationYears,
    issued: Date.now()
  };

  licences.push(licence);

  return NextResponse.json({ ok: true, licence });
}
