import { NextResponse } from "next/server";

let products: any[] = [];

export async function POST(req: Request) {
  const { name } = await req.json();

  if (!name) {
    return NextResponse.json({ ok: false, message: "Missing name" }, { status: 400 });
  }

  const product = {
    id: crypto.randomUUID(),
    name,
    created: Date.now()
  };

  products.push(product);

  return NextResponse.json({ ok: true, product });
}
