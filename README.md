# Next.js + Payload CMS Demo

A CMS-driven demo website: Next.js 15 (App Router) frontend + Payload CMS 3.x
backend on Postgres. Built as a starter template — intentionally minimal, not
over-engineered.

## Structure

```
src/
  app/
    page.tsx                 Home
    services/page.tsx        Services listing (CMS-driven grid)
    services/[slug]/page.tsx Service detail (dynamic route)
    about/page.tsx            About (from Payload global)
    contact/page.tsx          Contact (from Payload global)
    (payload)/admin/...       Payload admin panel at /admin
    (payload)/api/...         Payload REST API at /api
  collections/
    Services.ts   Media.ts   Users.ts
  globals/
    About.ts   Contact.ts
  components/
    Header.tsx  Footer.tsx  HeroBanner.tsx
    ServiceCard.tsx  ServicesGrid.tsx  ContentSection.tsx  CTASection.tsx
  lib/
    payload.ts    getServices / getServiceBySlug / getAbout / getContact
  seed/
    index.ts      Dummy content seed script
  payload.config.ts
```

## Getting started

1. Copy `.env.example` to `.env` and point `DATABASE_URI` at a running
   Postgres instance. Set `PAYLOAD_SECRET` to any long random string.
2. `npm install`
3. `npm run dev`
4. Visit `/admin` to create your first admin user (Payload prompts for this
   automatically on first load), then add Service entries, an About global,
   and a Contact global — each Service needs a `heroImage`.
5. Optionally run `npx tsx src/seed/index.ts` to pre-populate the Services
   list and both globals with the dummy copy from the original spec (you'll
   still need to attach hero images by hand in the admin UI, since uploads
   can't be scripted without real image files).
6. Visit the frontend: `/`, `/services`, `/services/web-development`,
   `/about`, `/contact`.

## Notes / next steps for a real build

- `src/lib/payload.ts` has hand-written types; run
  `npm run generate:types` after your schema is finalized in Postgres to
  swap in Payload's generated `payload-types.ts`.
- Rich text (`content` fields) currently render as plain short-description
  text as a placeholder — wire up
  `@payloadcms/richtext-lexical/react`'s `RichText` component in
  `ContentSection` usages once real content exists.
- The contact form is a static placeholder with no submission handler, per
  the spec — add a server action or API route when ready to wire it up.
- No UI library is used beyond Tailwind, per the spec.
