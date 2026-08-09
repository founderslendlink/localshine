# Local Shine Website

A static website for Local Shine, a South Florida pressure washing and exterior cleaning company. The primary conversion action is direct texting: visitors should text their address, photos and job details to 786-505-1641.

## What's inside

```
index.html             -> Home page with services and SMS-first CTAs
residential.html       -> Residential pressure washing page
commercial.html        -> Commercial / contractor site-estimate page
quote.html             -> Simple contact/text page for old links and SEO
dashboard.html         -> Business login + table of legacy inquiries
css/style.css          -> All styling
js/supabase-config.js  -> Supabase keys for the legacy dashboard
js/dashboard.js        -> Dashboard login + inquiry table
js/ba-slider.js        -> Commercial and residential before/after sliders
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

- The public quote form has been removed. Public CTAs open SMS, phone or email directly.
- `quote.html` remains as a lightweight contact page so old links do not break.
- Supabase files remain only for the legacy dashboard and can be removed later if the dashboard is no longer needed.
