# AkshTech Solutions — SAP PP · QM · PS Consulting Website

## Project Overview
- **Name**: AkshTech Solutions
- **Domain**: https://akshtech.co.in
- **Goal**: Professional SAP consulting website for independent contractor Ronit Rao, specialising in SAP PP, QM and PS support & implementation services
- **Tech Stack**: Hono + TypeScript + Cloudflare Pages

## Completed Features
- ✅ Full single-page responsive website (dark, modern theme)
- ✅ Sticky navigation with mobile hamburger menu
- ✅ Hero section with consultant profile card, floating badges, animated stats
- ✅ 6 services cards: SAP PP, SAP QM, SAP PS, AMS Support, Implementation, S/4HANA
- ✅ Skill bars with proficiency levels (animated on scroll)
- ✅ About / Consultant section with timeline (Ronit Rao profile)
- ✅ 6 detailed case studies (global industries)
- ✅ 6 client testimonials with star ratings
- ✅ 8 industry cards (Manufacturing, Pharma, Automotive, O&G, etc.)
- ✅ 5-step engagement process section
- ✅ CTA strip with availability indicator
- ✅ Contact form (POST /contact → thank you page)
- ✅ Footer with links and module badges
- ✅ Back-to-top button
- ✅ AOS scroll animations

## URLs
- **Preview (sandbox)**: https://3000-iew0t4u3paynik213aoex-ea026bf9.sandbox.novita.ai
- **Production target**: https://akshtech.co.in
- **Cloudflare Pages project**: akshtech

## Deployment — Cloudflare Pages

### 1. Configure Cloudflare API Key
Go to the **Deploy tab** → set your Cloudflare API token.

### 2. Deploy
```bash
cd /home/user/webapp
npm run build
npx wrangler pages project create akshtech --production-branch main
npx wrangler pages deploy dist --project-name akshtech
```

### 3. Connect Custom Domain (akshtech.co.in)
After deploying to Cloudflare Pages:
1. Go to Cloudflare Dashboard → Pages → akshtech → Custom Domains
2. Add `akshtech.co.in` and `www.akshtech.co.in`
3. In GoDaddy: change nameservers to Cloudflare nameservers, OR add CNAME records pointing to `akshtech.pages.dev`

### GoDaddy DNS Settings (CNAME option):
| Type  | Name | Value                    |
|-------|------|--------------------------|
| CNAME | @    | akshtech.pages.dev       |
| CNAME | www  | akshtech.pages.dev       |

## Data Architecture
- **No database** — static single-page application
- Contact form POSTs to `/contact` endpoint → returns thank-you page
- All data is static/hardcoded in `src/index.tsx`

## User Guide
The website is a single scrollable page with anchor navigation:
- `#services` — SAP PP / QM / PS service details
- `#about` — Ronit Rao consultant profile
- `#cases` — 6 case study cards
- `#testimonials` — 6 client testimonials
- `#industries` — 8 industry verticals
- `#process` — 5-step engagement process
- `#contact` — enquiry form

## Local Development
```bash
npm run build
pm2 start ecosystem.config.cjs
# Visit http://localhost:3000
```
