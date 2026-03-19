import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://yztkqzlwlaxwphqwzavc.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_GYP5HgTBxVUIKenP0txRJA_mrfOIblw";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
