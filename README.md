# Giakaa Landing + CMS (o8m Labs)

This project clones the overall layout/structure of giakaa.com and adds a custom CMS that lets non-technical users manage hero slides and SEO-optimized blogs.

## Architecture Overview

- `frontend/`: Next.js App Router. Landing page, blog listing/detail, and a lightweight admin UI.
- `backend/`: Node.js + Express REST API. Postgres database with raw SQL and migrations.
- Data flow: CMS UI → Express APIs → Postgres → frontend pages.

## Folder Structure

- `backend/src/controllers`: API handlers for hero and blog CRUD
- `backend/src/routes`: REST endpoints for CMS operations
- `backend/src/db/migrations`: Postgres schema + indexing
- `frontend/app`: Landing page, blog pages, admin UI, sitemap
- `frontend/components`: Reusable UI components (hero slider, cards, layout)
- `frontend/lib`: API fetchers used by server and client components

## Rendering Strategy (CSR / SSR / Hybrid)

- Landing page: Server component fetches hero data, slider runs on the client.
- Blog listing: Server component with revalidation for SEO and freshness.
- Blog detail: Server component with dynamic metadata and canonical tags.

This hybrid approach balances SEO, performance, and CMS-driven updates.

## Database Design (Postgres)

- `hero_slides`: CMS-driven hero slider content
- `blogs`: SEO-optimized blog posts with draft/publish workflow

### Indexing
- Unique index on `blogs.slug` for SEO-friendly URLs and quick lookups.
- Index on `blogs.status` for published filtering.
- Index on `hero_slides.is_active` and `display_order` for efficient ordering.

## Backend APIs (CMS)

### Hero
- `GET /api/hero` (public, active only)
- `GET /api/hero?includeInactive=true` (admin)
- `POST /api/hero`
- `PUT /api/hero/:id`
- `DELETE /api/hero/:id`

### Blogs
- `GET /api/blogs` (published only)
- `GET /api/blogs?status=all`
- `GET /api/blogs/:slug`
- `GET /api/blogs/id/:id` (admin)
- `POST /api/blogs`
- `PUT /api/blogs/id/:id`
- `DELETE /api/blogs/id/:id`

## SEO Strategy

- SEO-friendly URLs: `/blog/:slug`
- Dynamic meta title/description per blog post
- Canonical URLs on blog detail and blog list
- Open Graph tags for basic social sharing
- Dynamic sitemap at `/sitemap.xml`

## Performance Considerations

- Lazy-loaded media (images + videos)
- Revalidation for blog listing to avoid unnecessary re-renders
- Content-only fetch for critical above-the-fold elements

## Security Notes

- Input validation at API boundary
- Slug uniqueness enforced at DB + API level
- Basic content sanitization to reduce XSS risk

## Setup

### Backend
1. Create `backend/.env` with:
   - `DATABASE_URL=...`
   - `PORT=5000`
   - `CLOUDINARY_CLOUD_NAME=...`
   - `CLOUDINARY_API_KEY=...`
   - `CLOUDINARY_API_SECRET=...`
2. Run:
   - `npm install`
   - `npm run dev`

### Frontend
1. Create `frontend/.env.local` with:
   - `NEXT_PUBLIC_API_BASE_URL=http://localhost:5000`
   - `API_BASE_URL=http://localhost:5000`
   - `NEXT_PUBLIC_SITE_URL=http://localhost:3000`
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=...`
   - `NEXT_PUBLIC_CLOUDINARY_API_KEY=...`
2. Run:
   - `npm install`
   - `npm run dev`

## Trade-offs

- Admin authentication is intentionally omitted.
- Content supports HTML input for speed; rich-text editing can be added.

## Improvements With More Time

- Add image uploads (Cloudinary/S3)
- Rich-text editor + preview mode
- Role-based CMS access
- Lighthouse SEO report automation
- Markdown support with server-side rendering


