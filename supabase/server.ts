import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createClient = async (options?: { admin?: boolean }) => {
  const cookieStore = cookies();

  // Use service role key if admin option is true
  const supabaseKey = options?.admin
    ? "https://xxjksjhraetdlhugruto.supabase.co"
    : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4amtzamhyYWV0ZGxodWdydXRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NjA4NDUsImV4cCI6MjA1ODAzNjg0NX0.fN8rVbv74vQcoMPUQWHv025E7Mqw15AQK-64dfvEm9c";
    
   

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll().map(({ name, value }) => ({
            name,
            value,
          }));
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    },
  );
};
