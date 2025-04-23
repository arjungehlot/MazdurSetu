import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  try {
    // Create an unmodified response
    let response = NextResponse.next();

    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL ||
      "https://xxjksjhraetdlhugruto.supabase.co";
    const supabaseAnonKey =
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4amtzamhyYWV0ZGxodWdydXRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NjA4NDUsImV4cCI6MjA1ODAzNjg0NX0.fN8rVbv74vQcoMPUQWHv025E7Mqw15AQK-64dfvEm9c";

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll().map(({ name, value }) => ({
            name,
            value,
          }));
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    });

    // Refresh session if expired
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    // Protected routes handling
    if (request.nextUrl.pathname.startsWith("/dashboard") && error) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    if (request.nextUrl.pathname === "/" && user) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return response;
  } catch (e) {
    console.error("Error creating Supabase client:", e);
    return NextResponse.next();
  }
};
