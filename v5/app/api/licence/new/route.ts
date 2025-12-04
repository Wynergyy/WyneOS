import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customer, product } = body;

    if (!customer || !product) {
      return NextResponse.json(
        { ok: false, message: "Missing fields" },
        { status: 400 }
      );
    }

    // Placeholder demo logic
    const licence = {
      licenceVersion: "1.0.0",
      licenceID: crypto.randomUUID(),
      customer,
      product,
      issued: Date.now(),
      machineID: "unassigned",
      publicKey: "demo-public-key",
      signature: "demo-signature",
      payload: {
        features: {},
        limits: {},
        metadata: {}
      }
    };

    return NextResponse.json(licence);
  } catch {
    return NextResponse.json(
      { ok: false, message: "Error processing request" },
      { status: 500 }
    );
  }
}
