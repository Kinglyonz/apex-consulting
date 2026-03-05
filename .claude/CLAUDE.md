# CLAUDE.md — The APEX Rule Book Website

## PROJECT IDENTITY
- **Project Name:** The APEX Rule Book — Official Website
- **One-line Description:** A premium black-and-gold website selling "The APEX Rule Book" (50 Laws of Power, Success, and Personal Sovereignty) and offering private consultations with the authors.
- **Core Mission:** Create a visually stunning, memorable web experience that positions the book as a premium power/strategy product and drives book sales + consultation bookings.
- **Success Criteria:** Live website that accurately represents the book's branding, enables purchases, and generates consultation leads.
- **PRD:** `./research/PRD.md`

---

## TECHNICAL CONTEXT

### Tech Stack
- **Frontend:** Vanilla HTML5 / CSS3 / JavaScript (no frameworks — intentionally lightweight)
- **Fonts:** Google Fonts — Cinzel (display), Inter (body), Playfair Display (accent/italic)
- **Icons:** Font Awesome 6.5
- **3D Effects:** CSS3 transforms + perspective (no WebGL/Three.js)
- **Animations:** CSS keyframes + JavaScript (requestAnimationFrame)
- **No backend at MVP** — static site, contact form simulated client-side

### Architectural Decisions
1. **Single-page app (SPA) with page-turn navigation** — all 6 sections are full-viewport "pages" that transition with a book page-turn animation
2. **Book-opening intro** — site loads with a 3D book cover; clicking opens it and reveals the main site
3. **3D floating/rotating book** — CSS 3D transforms create a six-faced book (front, back, spine, top, bottom, pages edge) that floats and rotates
4. **No build tools** — plain files, no bundler, no npm (deploy-anywhere simplicity)
5. **Mouse-interactive book** — on hover, the 3D book follows cursor position

### Coding Standards
- Semantic HTML5
- CSS custom properties (variables) for all colors/fonts
- Mobile-first responsive breakpoints: 480px, 768px, 1024px
- BEM-inspired class naming
- Clean, commented code sections

---

## CURRENT STATE

### What Has Been Built ✅
- [x] `index.html` — Complete 6-page structure (Home, About, The Laws, The Book, Consultation, Contact)
- [x] `styles.css` — Full black/charcoal/gold theme, 3D book CSS, responsive design, animations
- [x] `script.js` — Book-opening intro, page-turn transitions, floating book, stat counters, gold particle system, contact form, keyboard/scroll/touch navigation
- [x] Book cover intro with accurate title, subtitle, crown SVG logo, and authors
- [x] All book text updated to match actual cover: "50 Laws of Power, Success, and Personal Sovereignty"
- [x] Back cover text used as quotes: "50 Brutal Truths to Remain the Apex Predator" (tagline)
- [x] SVG crown logo throughout (nav, cover, 3D book faces)

### What Is In Progress 🔄
- [ ] Methodology documentation (viability, PRD, roadmap per Dr. Lee's framework)
- [ ] SEO metadata (Open Graph tags, description, favicon)

### Known Issues / Technical Debt
- Contact form is client-side simulation only (needs real email service)
- "Buy" buttons link to `#` placeholder (need actual purchase URLs)
- No favicon yet
- No Open Graph / social sharing meta tags
- Gold particle canvas may need performance optimization on older phones
- Crown SVG is inline — could be extracted to a reusable component/file

---

## AGENT INSTRUCTIONS

### How to approach this codebase:
1. Always read this file first for project context
2. Check `./research/viability-analysis.md` for project scope and decisions
3. The site is a **static SPA** — no build step, no framework, no backend
4. Respect the **black, charcoal, white, gold** color scheme — never introduce other colors
5. All typography uses the three font families defined in CSS variables
6. The 3D book is a critical brand element — maintain its visual quality

### Before making changes, ask:
- Does this change align with the premium "Apex Predator" branding?
- Will this work on mobile (320px viewport)?
- Does this maintain the book metaphor (page turns, cover opening)?

### Never do without explicit approval:
- Add a CSS/JS framework (React, Tailwind, etc.)
- Change the color scheme
- Remove the book-opening intro or page-turn navigation
- Add backend dependencies
- Change the authors' names, book title, or subtitle

---

## FILE STRUCTURE MAP
```
Apex/
├── index.html          # Main SPA — all 6 page sections
├── styles.css          # Complete stylesheet — theme, 3D book, layout, responsive
├── script.js           # All interactivity — intro, page turns, animations
├── research/
│   ├── viability-analysis.md   # Phase 1: Research & viability
│   ├── PRD.md                  # Phase 3: Product requirements (TODO)
│   └── roadmap.md              # Phase 7: Build roadmap (TODO)
├── .claude/
│   └── CLAUDE.md              # THIS FILE — persistent memory
```

---

## EXTERNAL DEPENDENCIES
| Dependency | Purpose | URL |
|---|---|---|
| Google Fonts | Cinzel, Inter, Playfair Display | https://fonts.google.com |
| Font Awesome 6.5 | Icons (crown, check, social, etc.) | https://fontawesome.com |

### Environment Variables Needed
- None at MVP (static site)
- Future: `STRIPE_KEY`, `EMAILJS_KEY`, `CALENDLY_URL`

---

## BRANDING REFERENCE

### Book Details
- **Full Title:** The APEX Rule Book
- **Subtitle (Front Cover):** 50 Laws of Power, Success, and Personal Sovereignty
- **Tagline (Back Cover):** 50 Brutal Truths to Remain the Apex Predator
- **Authors:** Dr. Ernesto Lee & Candace Lyons
- **Logo:** Geometric gold crown (angular, mountain-like peaks with a diamond center)

### Color Palette
| Name | Hex | CSS Variable |
|---|---|---|
| Gold Light | #FFD700 | `--gold-light` |
| Gold | #DAA520 | `--gold` |
| Gold Dark | #B8860B | `--gold-dark` |
| Black | #0a0a0a | `--black` |
| Charcoal | #1a1a1a | `--charcoal` |
| Charcoal Light | #2a2a2a | `--charcoal-light` |
| White | #f5f5f5 | `--white` |
| White Dim | #cccccc | `--white-dim` |
| Gray | #888888 | `--gray` |

### Typography
| Role | Font | Weights |
|---|---|---|
| Display/Headings | Cinzel | 400, 600, 700, 900 |
| Body | Inter | 300, 400, 500, 600 |
| Accent/Quotes | Playfair Display | 400, 700, italic |

---

## USER AVATAR
**Primary Audience:** Ambitious individuals (25-45) who feel stuck despite hard work. They're drawn to power dynamics, strategic thinking, and no-BS self-improvement. They've read "48 Laws of Power" and want something more actionable. They respect premium branding and are willing to pay for direct access to mentors.

**UX Principles:**
- Premium feel — every interaction should feel intentional and polished
- Respect their time — clear CTAs, no fluff
- Build authority — the site itself should demonstrate the "Apex" standard
- Mobile-first — this audience discovers content on social media (Instagram, TikTok)

---

## METACOGNITIVE PROTOCOLS

Before executing any significant task, pause and answer:
1. What assumptions am I making about this request?
2. What could go wrong that hasn't been anticipated?
3. What related concerns should I raise before proceeding?
4. Is there a better approach than what was requested?

After completing any significant task, reflect:
1. What should update in this documentation?
2. What patterns emerged that we should codify?
3. What technical debt did this create?
4. What should be flagged that wasn't asked about?

Flag insights with **[METACOGNITIVE NOTE]** so they stand out.
