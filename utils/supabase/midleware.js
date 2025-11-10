// src/utils/supabase/middlewareClient.js
import { createClient } from "@supabase/supabase-js";

// Этот клиент безопасен для Edge Runtime (в middleware)
export function createEdgeSupabaseClient(request) {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      global: {
        headers: {
          Authorization: request.cookies.get("sb-access-token")?.value
            ? `Bearer ${request.cookies.get("sb-access-token").value}`
            : "",
        },
      },
    }
  );
}
