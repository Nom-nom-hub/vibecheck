# Supabase Setup for VibeCheck

This document provides instructions for setting up Supabase for the VibeCheck application.

## Prerequisites

- A Supabase account
- Access to the Supabase project dashboard

## Database Setup

1. Navigate to your Supabase project dashboard
2. Go to the SQL Editor
3. Copy the contents of the `supabase/schema.sql` file
4. Paste the SQL into the editor and run it to create the necessary tables and policies

## Authentication Setup

1. In the Supabase dashboard, go to Authentication > Settings
2. Configure the following settings:

### Email Auth

- Enable Email provider
- Set up email templates for confirmation, invitation, and password reset

### Site URL

- Set the Site URL to your production URL (or localhost for development)
- Add any additional redirect URLs needed

## Environment Variables

Ensure the following environment variables are set in your application:

```
NEXT_PUBLIC_SUPABASE_URL=https://aqhxhsmeofxpzcfwkwco.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxaHhoc21lb2Z4cHpjZndrd2NvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyNzk4NTMsImV4cCI6MjA2MTg1NTg1M30.Ffmjkc1mKDqPvhoYSKOxpc4QuIvmDZ6ZMvACVSsnzqg
```

## Integration with RevenueCat

To integrate Supabase with RevenueCat for subscription management:

1. When a user subscribes through RevenueCat, store the subscription details in the `subscriptions` table
2. Use the `user_id` to link the subscription to the user's account
3. Update the subscription status when webhooks are received from RevenueCat

## Testing the Setup

1. Create a new user account through the signup form
2. Verify that a profile is automatically created in the `profiles` table
3. Test subscription flows and ensure data is properly stored in the `subscriptions` table
4. Test post analysis and ensure data is properly stored in the `post_analyses` table
