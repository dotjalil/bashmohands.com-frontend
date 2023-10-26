import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ksrhgwdrcefysyognaty.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtzcmhnd2RyY2VmeXN5b2duYXR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY5OTYyNjEsImV4cCI6MjAxMjU3MjI2MX0.yVa6x2XVWyDF-Dy5J6XTKLOWVnzG9aoWHmi_jG7g0OY";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
