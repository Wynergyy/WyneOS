import { NextResponse } from "next/server";

interface AssembleRequest {
  nodes: unknown[];
  rules?: Record<string, unknown>;
}

interface AssembleResult {
  assembled: unknown[];
  timestamp: number;
  meta: {
    count: number;
    rulesApplied: boolean;
  };
}

function assembleNodes(input: AssembleRequest): AssembleResult {
  const nodes = Array.isArray(input.nodes) ? input.nodes : [];

  const result: AssembleResult = {
    assembled: nodes,
    timestamp: Date.now(),
    meta: {
      count: nodes.length,
      rulesApplied: Boolean(input.rules)
    }
  };

  return result;
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body = (await req.json()) as AssembleRequest;

    const output = assembleNodes(body);

    return NextResponse.json({
      ok: true,
      result: output
    });
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        error: "Invalid request payload",
        detail: err instanceof Error ? err.message : "Unknown error"
      },
      { status: 400 }
    );
  }
}
