import { createClient } from '@supabase/supabase-js';
const SUPABASE_URL = "https://oauvxzpzuxkslxrfwmgt.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9hdXZ4enB6dXhrc2x4cmZ3bWd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjkwODM4NDEsImV4cCI6MTk4NDY1OTg0MX0.Z6GHNfoh-eJBhBfmD-4htZg0nHdT2rGLoTmF1ue45t8";
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);