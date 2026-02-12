import { createClient } from '@supabase/supabase-js';

// Diese Variablen ziehen sich die Daten aus deiner .env.local Datei
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase URL oder Anon Key fehlen! Überprüfe deine .env.local Datei.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
