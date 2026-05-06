import { NextRequest, NextResponse } from "next/server";

/**
 * POST endpoint intended for native HTML form submits (`method="post"`).
 * Responds with 303 See Other so the browser follows up with GET to `/`.
 */
export async function POST(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = "/";
  url.search = "";
  return NextResponse.redirect(url, 303);
}
