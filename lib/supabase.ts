import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// User management functions
export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  return { data, error };
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { data, error };
}

export async function signInWithGoogle() {
  // For local development, we'll use the current origin
  const redirectUrl = typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : undefined;

  console.log('Redirecting to:', redirectUrl);

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: redirectUrl,
      // You can add additional scopes if needed
      scopes: 'email profile',
    },
  });

  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

// Session management
export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

// Database functions
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  return { data, error };
}

export async function updateUserProfile(userId: string, updates: any) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId);

  return { data, error };
}

// Post analysis history
export async function saveAnalysis(userId: string, postContent: string, analysisResult: any) {
  const { data, error } = await supabase
    .from('post_analyses')
    .insert([
      {
        user_id: userId,
        post_content: postContent,
        analysis_result: analysisResult,
        created_at: new Date().toISOString()
      }
    ]);

  return { data, error };
}

export async function getUserAnalyses(userId: string) {
  const { data, error } = await supabase
    .from('post_analyses')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  return { data, error };
}

// Subscription management
export async function saveSubscription(userId: string, subscriptionDetails: any) {
  const { data, error } = await supabase
    .from('subscriptions')
    .upsert([
      {
        user_id: userId,
        ...subscriptionDetails,
        updated_at: new Date().toISOString()
      }
    ]);

  return { data, error };
}

export async function getSubscription(userId: string) {
  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .single();

  return { data, error };
}
