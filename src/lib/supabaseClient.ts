import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vtumuuqcfbyobgrwsjfi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0dW11dXFjZmJ5b2JncndzamZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MjE3NzksImV4cCI6MjA2Mzk5Nzc3OX0.3YjNM189Pw5ULM9Hzg3u2CnPT3qC18H3MedWuxpOECA';

export const supabase = createClient(supabaseUrl, supabaseKey);
