import { createClient } from "../../../../supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const error = requestUrl.searchParams.get("error");
  const redirectTo = requestUrl.searchParams.get("redirect_to") || "/dashboard";

  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);
    // Use the request URL origin for redirects
    return NextResponse.redirect(new URL(redirectTo, requestUrl.origin));
  }

  if (error) {
    // Handle expired or invalid email links
    return NextResponse.redirect(
      new URL("/sign-in?error=expired_link", requestUrl.origin),
    );
  }

  // Default fallback redirect
  return NextResponse.redirect(new URL("/sign-in", requestUrl.origin));
}
