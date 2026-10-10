# PearlFlix Uganda

PearlFlix Uganda is a modern streaming platform concept for Ugandan films, Luganda-translated international titles, and video-jockey narrated content. The frontend is built with React + Vite, supports responsive mobile layouts, and includes a Supabase-ready integration layer.

## Features included

- Premium dark streaming UI with red and gold accents
- Featured home page, movie detail view, VJ directory, auth, and admin dashboard
- Search and filter by title, genre, language, and VJ
- Favorites and watchlist support
- Video player with loading and unavailable-state handling
- Supabase integration scaffold for database, auth, and storage
- SQL schema and Row Level Security rules
- Setup instructions, environment variables, and deployment guidance

## Local development

1. Install dependencies:

```bash
npm install
```

2. Copy the environment template:

```bash
cp .env.example .env.local
```

3. Add your Supabase values in `.env.local`:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_SUPABASE_STORAGE_BUCKET=movie-assets
```

4. Start the local app:

```bash
npm run dev
```

5. Build for production:

```bash
npm run build
```

## Supabase setup

### 1. Create a project

Visit https://supabase.com and create a project. Keep the project URL and anon key confidential.

### 2. Run the schema

Use the SQL in `supabase/schema.sql` inside the Supabase SQL editor to create:

- `movies`
- `vjs`
- `profiles`
- `favorites`

It also configures Row Level Security (RLS) policies and helper functions.

### 3. Storage bucket

Create a bucket named `movie-assets` or update `VITE_SUPABASE_STORAGE_BUCKET` to match your bucket. Add poster images and trailer files there. Store large video assets in a dedicated streaming service or Supabase Storage bucket with signed URLs or CDN support.

### 4. Authentication

Enable Email sign-in in Supabase Authentication. For real user accounts, do not hardcode secrets or embed keys in the frontend. Only the anon key should be used in browser code.

### 5. Admin configuration

The app includes an admin dashboard but it is not activated as a real payment or role system until Supabase Auth and database policies are configured. You can set admin access by updating `profiles` and assigning `is_admin = true` for a specific user.

## Important notes

- This app intentionally does not activate live payments.
- A real streaming file should never be placed directly in a database record.
- Use remote video URLs, signed storage URLs, or a proper streaming service with CDN delivery.
- If Supabase is not configured, the app falls back to local demo data so the interface still works.

## Deployment

The app can be deployed to any static host such as Vercel, Netlify, or GitHub Pages after creating a production build.

1. Build the app:

```bash
npm run build
```

2. Deploy the generated `dist` folder to your host.

3. Ensure environment variables are set in the deployment platform.

## Content licensing

Only use movies, posters, trailers, and media for which the owner has the right to distribute. The demo data is illustrative and should be replaced with licensed content in a production deployment.

