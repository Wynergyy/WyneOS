notepad "E:\CIC\WyneOS\v5\app\api\developer\products\route.ts"
import { NextResponse } from "next/server";

let products: any[] = [];

export async function GET() {
  return NextResponse.json({ products });
}
