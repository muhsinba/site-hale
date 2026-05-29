# Personalizing the site

Everything below uses placeholder text. The brand name is set to "Hale Bayramoğlu".
Search the project for the word **PERSONALIZE** — every spot that needs your real
details is marked with that comment. Here's the full checklist.

## 1. Name & brand

| What | Where |
| --- | --- |
| Business / brand name ("Hale Bayramoğlu") | `src/components/Header.tsx`, `src/components/Footer.tsx`, `src/app/layout.tsx` |
| Her name ("[Her Name]") | `src/components/About.tsx` |
| Browser tab title & description | `src/app/layout.tsx` (the `metadata` object) |

## 2. Her story & credentials

Edit `src/components/About.tsx`:
- The two paragraphs under "My Story"
- The three credential bullet points

## 3. Her photo

In `src/components/About.tsx` there's a placeholder box ("Her photo here").

1. Save her photo to `public/healer.jpg`
2. Add `import Image from "next/image";` at the top of the file
3. Replace the placeholder `<div>` with:
   ```tsx
   <Image
     src="/healer.jpg"
     alt="Portrait of [Her Name]"
     width={560}
     height={680}
     className="mx-auto aspect-[4/5] w-full max-w-sm rounded-[2rem] object-cover shadow-xl"
   />
   ```

## 4. Services & pricing

These live in the **database**, seeded from `prisma/seed.ts`.

1. Edit the `services` array in `prisma/seed.ts` (title, description, price, duration, icon)
2. Re-seed: `npm run db:seed`

`featured: true` highlights one card as "Most Loved". Set `priceLabel` to `"Free"`
for a complimentary offering. `durationMin` is in minutes.

## 5. Testimonials

Also in `prisma/seed.ts` — edit the `testimonials` array (use real ones, with
permission), then run `npm run db:seed`.

## 6. Contact details & social links

Edit `src/components/Footer.tsx`: `email`, `phone`, `address`, and `socials`.

## 7. Colors & fonts (optional)

- Colors: `src/app/globals.css`, the `@theme` block (e.g. `--color-gold`)
- Fonts: `src/app/layout.tsx` (currently Cormorant Garamond + Jost)

---

## Running the site

```bash
npm run dev      # start the dev server (http://localhost:3000)
npm run build    # production build
npm start        # run the production build
```

## Where booking requests go

Form submissions are saved to the database (the `Booking` table). To view them:

```bash
npm run db:studio   # opens Prisma Studio in your browser
```

> **Note:** booking requests are currently only stored in the database — they do
> **not** yet send an email. See "Next steps" below to add email notifications.

## Database: SQLite now, PostgreSQL later

The site runs on SQLite (`prisma/dev.db`) for now. To switch to PostgreSQL:

1. In `prisma/schema.prisma`, change `provider = "sqlite"` to `provider = "postgresql"`
2. In `.env`, set `DATABASE_URL` to your Postgres connection string
3. Run `npx prisma migrate dev`
4. Re-seed: `npm run db:seed`

## Next steps (not yet built)

- **Email notifications** when someone books (e.g. via Resend or Nodemailer)
- **Calendar booking** with real time-slots (e.g. Cal.com embed) instead of a request form
- **Admin page** to view/manage booking requests in the browser
- **Deploy** to Vercel (free) — connect the repo and add the `DATABASE_URL`

Just ask and I can add any of these.
