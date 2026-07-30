# Deployment Guide

This guide provides step-by-step instructions for deploying the Beauty Journey project to production.

## 1. Supabase Setup
Beauty Journey uses Supabase for authentication, database, and storage.

1. Create a new project on [Supabase](https://supabase.com).
2. Go to **Project Settings > API** and note your `Project URL`, `anon` key, and `service_role` key.
3. Run the database migrations (if provided in the project) or set up the tables as defined in `src/lib/supabase.ts`.
4. Configure **Storage** buckets:
   - `products`: Public access for product images.
   - `avatars`: Public access for user profiles.
5. Configure **Auth**:
   - Enable Email/Password provider.
   - (Optional) Enable Google/Apple OAuth and add redirect URLs: `https://your-domain.com/auth/callback`.

## 2. Paymob Setup
Paymob is the primary payment gateway.

1. Create an account on [Paymob](https://paymob.com).
2. Obtain your `API Key`, `HMAC Secret`, `Integration ID`, and `Iframe ID`.
3. Set the webhook URL in Paymob dashboard to `https://your-domain.com/api/webhooks/paymob`.

## 3. Vercel Deployment
1. Connect your GitHub repository to [Vercel](https://vercel.com).
2. In the **Environment Variables** section, add all variables from `.env.example`.
3. Ensure the **Build Command** is `npm run build` and the **Output Directory** is `.next`.
4. Deploy the project.

## 4. Post-Deployment Verification
- [ ] Verify that the home page loads correctly.
- [ ] Test the login/register flow.
- [ ] Perform a test checkout with Paymob test credentials.
- [ ] Check that images are being served from Supabase storage.
- [ ] Validate SEO using [Google Search Console](https://search.google.com/search-console).

## Environment Variables
Ensure all the following variables are set in your production environment:

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase Anon API Key |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase Service Role Key (Keep secret) |
| `NEXT_PUBLIC_APP_URL` | Your production domain (e.g., https://beautyjourney.com) |
| `PAYMOB_API_KEY` | Your Paymob API Key |
| `PAYMOB_HMAC_SECRET` | Your Paymob HMAC Secret |
| `PAYMOB_INTEGRATION_ID` | Your Paymob Card Integration ID |
| `PAYMOB_IFRAME_ID` | Your Paymob Iframe ID |
