# Product Requirements Document (PRD)
## The APEX Rule Book — Official Website & Consultation Platform

**Version:** 1.0  
**Date:** February 23, 2026  
**Authors:** Khalil Lyons (Developer), Dr. Ernesto Lee & Candace Lyons (Stakeholders)

---

## 1. EXECUTIVE SUMMARY

A premium single-page website for "The APEX Rule Book" by Dr. Ernesto Lee and Candace Lyons. The site serves as the primary digital storefront for the book (50 Laws of Power, Success, and Personal Sovereignty) and as a lead generation platform for private consultations with the authors. The experience is designed around a "book" metaphor — visitors open the book to enter the site, and navigate via page-turn transitions.

**Primary Value Proposition:** A visually stunning, memorable web experience that positions APEX as a premium power/strategy brand, drives book purchases, and converts visitors into consultation clients.

---

## 2. USER AVATAR

### Target Persona: "The Striver"
- **Age:** 25–45
- **Mindset:** Ambitious, action-oriented, frustrated by lack of results despite effort
- **Behavior:** Consumes power/strategy content (48 Laws of Power, Art of War, stoic philosophy). Active on Instagram, TikTok, YouTube. Values premium aesthetics. Willing to invest in mentorship.
- **Pain Point:** "I'm doing everything right but still not winning. Something is missing."
- **Success Looks Like:** Understanding the hidden rules of power. Having a personalized strategy. Feeling like an insider, not an outsider.
- **Would Tell a Friend When:** "This isn't another motivational book — it's the actual playbook."

---

## 3. FEATURE SPECIFICATION

### P0 — MVP Critical (DONE ✅)

| Feature | User Story | Acceptance Criteria | Status |
|---|---|---|---|
| Book-opening intro | As a visitor, I want a cinematic book-opening experience so I feel like I'm entering something exclusive | 3D book cover renders, click opens it, fades to main site | ✅ Done |
| Hero section with 3D floating book | As a visitor, I want to see the book floating/rotating so I'm immediately drawn to the product | Book floats, rotates, responds to mouse hover | ✅ Done |
| Page-turn navigation | As a visitor, I want page-turn transitions so the whole site feels like a book | Nav links, scroll, keyboard, and touch all trigger page-turn animation | ✅ Done |
| About section | As a visitor, I want to understand the book's philosophy and who wrote it | Philosophy, game-behind-the-game, authors cards + blockquote | ✅ Done |
| Laws preview | As a visitor, I want to see a sample of the 50 laws so I know it's worth buying | 6 law cards with Roman numerals, titles, descriptions | ✅ Done |
| Book purchase section | As a visitor, I want to see pricing and buy the book | Pricing cards (Digital $19.99, Bundle $39.99) with CTA buttons | ✅ Done |
| Consultation section | As a visitor, I want to see consultation options and pricing | 3 tiers: Power Session ($97), Deep Dive ($197), Mastery ($597) | ✅ Done |
| Contact form | As a visitor, I want to reach the authors | Name, email, interest dropdown, message, submit button | ✅ Done |
| Responsive design | As a mobile visitor, I want the site to work on my phone | Breakpoints at 480, 768, 1024px, mobile nav hamburger | ✅ Done |
| Gold particle ambient effect | As a visitor, I want the site to feel premium and alive | Floating gold dust particles on canvas | ✅ Done |

### P1 — Important (TODO)

| Feature | User Story | Priority |
|---|---|---|
| Working purchase links | As a buyer, I want "Buy" buttons to go to actual checkout | P1 |
| Real contact form submission | As a visitor, I want my message to actually reach the authors | P1 |
| SEO metadata | As a search engine, I want proper meta tags, OG images, descriptions | P1 |
| Favicon | As a browser user, I want to see the crown logo in my tab | P1 |
| Consultation booking integration | As a client, I want to book a consultation slot directly | P1 |
| Analytics | As the authors, I want to know how many visitors and conversions I get | P1 |

### P2 — Nice to Have

| Feature | User Story | Priority |
|---|---|---|
| Testimonials section | As a visitor, I want social proof from readers | P2 |
| Blog / insights section | As a returning visitor, I want fresh content from the authors | P2 |
| Email list signup | As the authors, I want to capture leads for email marketing | P2 |
| Book cover image integration | Replace SVG book face with actual cover photo | P2 |
| Social sharing | As a visitor, I want to share the book on social media | P2 |

---

## 4. TECHNICAL ARCHITECTURE

### Stack
- **Frontend:** Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Hosting:** TBD (Netlify, Vercel, or GitHub Pages recommended)
- **Domain:** TBD (theapexrulebook.com suggested)
- **No backend at MVP**

### File Structure
```
Apex/
├── index.html       # Single-page app, all sections
├── styles.css       # Theme, 3D book, layout, animations
├── script.js        # Interactivity and animations
├── research/        # Methodology documentation
├── .claude/         # AI memory system
├── assets/          # Images, favicon (future)
```

---

## 5. NON-FUNCTIONAL REQUIREMENTS

- **Performance:** Page load < 3s on 3G, 60fps animations on mid-range devices
- **Accessibility:** Keyboard navigation works, proper heading hierarchy, alt text on images
- **Mobile:** Fully responsive 320px–2560px
- **Browser Support:** Chrome, Safari, Firefox, Edge (latest 2 versions)
- **Security:** No sensitive data stored client-side. HTTPS required for production.

---

## 6. OUT OF SCOPE (MVP)

- User accounts / login
- Shopping cart / checkout (use external links)
- CMS / admin panel
- Blog engine
- Backend API
- Database
- Payment processing on-site

---

## 7. SUCCESS METRICS

| Metric | Launch Week | Month 1 | Month 3 |
|---|---|---|---|
| Unique visitors | 200 | 1,000 | 5,000 |
| Book purchase clicks | 20 | 100 | 500 |
| Consultation inquiries | 5 | 25 | 100 |
| Avg. session duration | > 60s | > 90s | > 120s |
| Bounce rate | < 50% | < 40% | < 35% |
