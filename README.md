# Local Shine Website

A static website for Local Shine, a South Florida exterior property maintenance company. The primary conversion action is direct texting or calling: visitors should send their address, service needs and photos when helpful to 786-505-1641.

## What's inside

```
lawn-maintenance.html  -> Recurring lawn maintenance page
exterior-cleaning.html -> Exterior cleaning page
property-cleanups.html -> Property cleanup page
service-areas.html     -> South Florida service area page
residential.html       -> Residential property maintenance legacy page
commercial.html        -> Commercial exterior cleaning legacy page
quote.html             -> Property estimate/contact page with no-backend email form
dashboard.html         -> Business login + table of legacy inquiries
css/style.css          -> All styling
js/supabase-config.js  -> Supabase keys for the legacy dashboard
js/dashboard.js        -> Dashboard login + inquiry table
js/ba-slider.js        -> Commercial before/after slider
js/nav.js              -> Mobile navigation
supabase/schema.sql    -> Legacy inquiries table
images/                -> Project image assets
```

## Run locally

```powershell
npm install
npm run dev -- --port 5173
```

Then open:

```text
http://127.0.0.1:5173/
```

## Build for Vercel

```powershell
npm run build
```

Vercel is configured with `vercel.json` to build with Vite and publish `dist`.

## Contact details

- Local Shine
- Text / call: 786-505-1641
- Email: christopher@localshineservices.com

## Notes

- Public CTAs open SMS, phone, email or the estimate page directly. The estimate page uses a no-backend form submission endpoint as a lightweight fallback to texting.
- `quote.html`, `residential.html` and `commercial.html` remain so old links do not break.
- Supabase files remain only for the legacy dashboard and can be removed later if the dashboard is no longer needed.
