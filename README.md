# WinIT — IT Services Website

Premium, conversion-focused marketing site for WinIT: ERP consulting, systems integration, process automation, analytics, and custom enterprise software. Built with **HTML, CSS, and JavaScript only**—no frameworks or CMS.

## Quick start

- Open `index.html` in a browser, or run a local server (e.g. `npx serve .` or `python -m http.server`) for best behavior with links and fonts.
- Replace placeholder content (e.g. `[Your city, state]`, `hello@winit.biz`, `+1 (555) 123-4567`) and add final copy and imagery as needed.

## Structure

| File / folder | Purpose |
|---------------|--------|
| `index.html` | Homepage: hero, trust strip, services, why WinIT, outcomes, case studies, about, testimonials, FAQ, CTA, contact form, footer |
| `styles.css` | Design tokens (colors, spacing, type), layout, components, dark mode (`prefers-color-scheme: dark`), reduced motion |
| `main.js` | Sticky header, mobile menu, search overlay, FAQ accordion, contact form validation, case-study slider, scroll reveal, footer year |
| `privacy.html` | Privacy policy placeholder (GDPR-oriented) |
| `cookies.html` | Cookie policy placeholder |
| `terms.html` | Terms of use placeholder |

## Features

- **Value proposition** above the fold: what WinIT does, who it serves, outcomes.
- **Navigation**: Home, Services, Solutions, Case Studies, About, Insights, Contact (header + footer).
- **CTAs**: Schedule a Discovery Call, Book a Consultation, Request a Quote, Talk to an Expert, Get Started.
- **Trust**: testimonials, outcomes, case study cards, FAQ, legal links, contact details, consent language on form.
- **Contact**: email, phone, hours, LinkedIn, robust form with validation and privacy consent.
- **Accessibility**: skip link, landmarks, heading hierarchy, focus states, `aria` on FAQ/search/menu, reduced motion respected.
- **SEO**: semantic HTML, meta description, JSON-LD Organization schema, clear H1/H2 structure.
- **Performance**: minimal JS, no heavy dependencies, lazy-friendly structure; add image `loading="lazy"` and optimize assets as you add them.
- **Dark mode**: follows `prefers-color-scheme: dark`; optional toggle can set `data-theme="light"` on `<html>` to override.

## Extending

- **Blog / Insights**: add `insights.html` (or a folder with articles) and link from nav and footer.
- **Case study pages**: add individual pages and point “Read more” and nav to them.
- **Search**: form currently goes to `/search?q=...`; implement a static search page or client-side search over your content.
- **Form submission**: wire the contact form to your backend or a form service (e.g. Formspree, Netlify Forms) and keep validation + consent as-is.
- **Theme toggle**: add a button that toggles `data-theme="light"` / `data-theme="dark"` on `<html>`; CSS is already set up for both.

## Customization

- **Colors**: edit `:root` and `[data-theme="dark"]` in `styles.css` (e.g. `--color-accent`, `--color-bg`, `--color-text`).
- **Fonts**: swap the Google Fonts link in `<head>`; variables `--font-sans` and `--font-serif` in CSS control type.
- **Content**: replace placeholder testimonials, case study text, outcomes, and contact details with your real copy and assets.

---

© WinIT. All rights reserved.
