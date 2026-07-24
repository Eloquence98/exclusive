import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  return handleProxy(req);
}

export async function GET(req: NextRequest) {
  return handleProxy(req);
}

export async function PUT(req: NextRequest) {
  return handleProxy(req);
}

export async function DELETE(req: NextRequest) {
  return handleProxy(req);
}

async function handleProxy(req: NextRequest) {
  const cookieStore = await cookies();
  // 1. Get the token we saved as 'jwt'
  const token = cookieStore.get("jwt")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. Get the target path from the query param (e.g., ?path=/orders)
  const { searchParams } = new URL(req.url);
  const targetPath = searchParams.get("path");

  if (!targetPath) {
    return NextResponse.json({ error: "Missing target path" }, { status: 400 });
  }

  // 3. Forward the request to your backend
  const backendUrl = `${process.env.BACKEND_URL}${targetPath}`;

  const body =
    req.method !== "GET" && req.method !== "HEAD"
      ? await req.json()
      : undefined;

  const response = await fetch(backendUrl, {
    method: req.method,
    headers: {
      "Content-Type": "application/json",
      // 4. Inject the token as Authorization Header (Standard for backends)
      Authorization: `Bearer ${token}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  // 5. Return the backend's response directly to the frontend
  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
