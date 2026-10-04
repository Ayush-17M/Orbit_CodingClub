# TechKshitiz Premium React Website

Frontend-only React/Vite site with GSAP, ScrollTrigger, React Three Fiber, Lenis, responsive navigation, gallery lightbox, editable localStorage CMS and demo admin login.

## Run

```bash
npm install
npm run dev
```

## Demo admin

Open `/admin/login`.

- Username: `admin`
- Password: `techkshitiz-demo`

These are demo-only frontend credentials. Connect real authentication/backend before production.

## Content storage

Public pages and `/admin` share `localStorage`. Use **Save Changes**, **Reset**, **Export Data**, and **Import Data** in Admin.

## Notes

- Phone and social URLs remain blank/configurable rather than invented.
- Map is a placeholder until an embed URL is supplied in Admin.
- Three.js is intentionally limited to strategic visual use and automatically respects reduced-motion settings.
