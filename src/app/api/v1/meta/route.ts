import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "@/config";
import { fetchMeta } from "@/lib/fetch-meta";
import type { MetaError } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function jsonError(
  status: number,
  error: string,
  message: string,
): NextResponse<MetaError> {
  return NextResponse.json(
    { error, message, statusCode: status },
    { status },
  );
}

function requireApiKey(req: NextRequest): NextResponse<MetaError> | null {
  const key = req.headers.get("x-api-key");
  if (!key) {
    return jsonError(
      401,
      "unauthorized",
      "Missing x-api-key header. Use the demo key mk_live_demo_metakit or get one at /signup.",
    );
  }
  if (key !== siteConfig.demoApiKey) {
    return jsonError(
      401,
      "unauthorized",
      "Invalid API key. Demo key: mk_live_demo_metakit",
    );
  }
  return null;
}

function extractUrl(req: NextRequest, body: unknown): string | null {
  if (req.method === "GET") {
    return req.nextUrl.searchParams.get("url");
  }
  if (body && typeof body === "object" && "url" in body) {
    const u = (body as { url: unknown }).url;
    return typeof u === "string" ? u : null;
  }
  return null;
}

async function handle(req: NextRequest): Promise<NextResponse> {
  const authError = requireApiKey(req);
  if (authError) return authError;

  let body: unknown = null;
  if (req.method === "POST") {
    const contentType = req.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      try {
        body = await req.json();
      } catch {
        return jsonError(400, "bad_request", "Invalid JSON body");
      }
    } else {
      return jsonError(
        400,
        "bad_request",
        "POST requires Content-Type: application/json with { \"url\": \"...\" }",
      );
    }
  }

  const rawUrl = extractUrl(req, body);
  if (!rawUrl || !rawUrl.trim()) {
    return jsonError(
      400,
      "bad_request",
      'Provide a url query param (GET) or JSON body { "url": "https://..." } (POST)',
    );
  }

  try {
    const meta = await fetchMeta(rawUrl.trim());
    return NextResponse.json(meta, {
      headers: {
        "Cache-Control": "no-store",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "x-api-key, content-type",
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Fetch failed";
    if (message.includes("aborted") || message.includes("AbortError")) {
      return jsonError(504, "timeout", "Upstream fetch timed out after 5s");
    }
    if (
      message.includes("Private") ||
      message.includes("local") ||
      message.includes("Only http") ||
      message.includes("Invalid URL") ||
      message.includes("hostname")
    ) {
      return jsonError(400, "invalid_url", message);
    }
    return jsonError(502, "upstream_error", message);
  }
}

export async function GET(req: NextRequest) {
  return handle(req);
}

export async function POST(req: NextRequest) {
  return handle(req);
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "x-api-key, content-type",
      "Access-Control-Max-Age": "86400",
    },
  });
}
