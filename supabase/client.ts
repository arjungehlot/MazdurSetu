import { createBrowserClient } from "@supabase/ssr";

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
      "https://xxjksjhraetdlhugruto.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4amtzamhyYWV0ZGxodWdydXRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NjA4NDUsImV4cCI6MjA1ODAzNjg0NX0.fN8rVbv74vQcoMPUQWHv025E7Mqw15AQK-64dfvEm9c",
  );
