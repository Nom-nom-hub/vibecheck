import { createClient } from '@supabase/supabase-js';

// Default values for local development or preview environments
const defaultSupabaseUrl = 'https://aqhxhsmeofxpzcfwkwco.supabase.co';
const defaultSupabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxaHhoc21lb2Z4cHpjZndrd2NvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyNzk4NTMsImV4cCI6MjA2MTg1NTg1M30.Ffmjkc1mKDqPvhoYSKOxpc4QuIvmDZ6ZMvACVSsnzqg';

// Use environment variables if available, otherwise use defaults
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || defaultSupabaseUrl;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || defaultSupabaseAnonKey;

// Log a warning if using default values
if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.warn('Warning: Using default Supabase credentials. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables for production.');
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

// Define the profile update interface
interface ProfileUpdate {
  username?: string;
  full_name?: string;
  avatar_url?: string;
  website?: string;
  bio?: string;
  email?: string;
  [key: string]: any; // Allow for other fields
}

export async function updateUserProfile(userId: string, updates: ProfileUpdate) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId);

  return { data, error };
}

// Post analysis history
// Define the analysis result interface
interface AnalysisResult {
  scores: {
    engagement: number;
    relatability: number;
    cringe: number;
    originality: number;
    clarity: number;
    trendiness: number;
  };
  suggestions: Array<{
    type: string;
    content: string;
  }>;
  overallScore: number;
  summary: string;
  [key: string]: any; // Allow for other fields
}

export async function saveAnalysis(userId: string, postContent: string, analysisResult: AnalysisResult) {
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
// Define the subscription details interface
interface SubscriptionDetails {
  subscription_id?: string;
  status?: string;
  plan_id?: string;
  plan_name?: string;
  price_id?: string;
  amount?: number;
  currency?: string;
  interval?: string;
  start_date?: string;
  end_date?: string;
  trial_end?: string;
  cancel_at_period_end?: boolean;
  [key: string]: any; // Allow for other fields
}

export async function saveSubscription(userId: string, subscriptionDetails: SubscriptionDetails) {
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
