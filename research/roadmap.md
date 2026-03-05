# Build Roadmap — The APEX Rule Book Website

**Created:** February 23, 2026  
**Methodology:** Dr. Ernesto Lee's Seven-Phase Professional Methodology

---

## MVP DEFINITION

### What constitutes the minimum viable product:
A live, publicly accessible website that showcases the book, provides consultation information, and captures leads via a contact form.

### What has been shipped (Sprint Zero — COMPLETE ✅):
- Full 6-page SPA with book-opening intro
- 3D floating/rotating interactive book
- Page-turn navigation system
- Black/gold/charcoal premium theme matching the book cover
- All content sections: Home, About, Laws, Book Purchase, Consultation, Contact
- Responsive design (mobile, tablet, desktop)
- Gold particle ambient effects
- Animated stat counters

### What we are explicitly deferring to post-MVP:
- On-site payments (use external links for now)
- CMS / content management
- User accounts
- Blog
- Automated consultation scheduling

---

## MILESTONE STRUCTURE

### ✅ Milestone 0: Foundation (COMPLETE)
**Duration:** Day 1  
**Deliverables:**
- [x] Project structure created
- [x] HTML with all 6 page sections
- [x] CSS with complete black/gold theme
- [x] 3D floating book with rotation animation
- [x] Book-opening intro animation
- [x] Page-turn navigation (click, scroll, keyboard, touch)
- [x] Contact form UI
- [x] Responsive design
- [x] Methodology documentation initialized

**Success Criteria:** Site loads, all sections visible, book animations work, navigable on desktop and mobile.

---

### 🔄 Milestone 1: Content Polish & SEO (NEXT)
**Duration:** 1-2 hours  
**Deliverables:**
- [ ] Add Open Graph meta tags (title, description, image)
- [ ] Add favicon (crown logo as .ico/.png)
- [ ] Verify all text matches the actual book content
- [ ] Add proper `<meta>` description for search engines
- [ ] Optimize images/assets if any are added
- [ ] Test cross-browser (Chrome, Safari, Firefox, Edge)

**Success Criteria:** Site is shareable on social media with proper preview cards.

---

### Milestone 2: Purchase & Contact Integration
**Duration:** 1-3 hours  
**Deliverables:**
- [ ] Wire "Buy Digital" button to actual store link (Amazon, Gumroad, etc.)
- [ ] Wire "Buy Bundle" button to actual store link
- [ ] Integrate contact form with email service (EmailJS, Formspree, or Netlify Forms)
- [ ] Add consultation booking link (Calendly or similar)
- [ ] Test form submission end-to-end

**Dependencies:** Authors need to provide: purchase URLs, email for form submissions, Calendly link (if applicable)

**Success Criteria:** "Buy" buttons lead to real checkout. Contact form delivers messages to authors' email.

---

### Milestone 3: Hosting & Launch
**Duration:** 1-2 hours  
**Deliverables:**
- [ ] Choose hosting (Netlify recommended — free tier, HTTPS, custom domain)
- [ ] Register/configure domain (theapexrulebook.com or similar)
- [ ] Deploy site
- [ ] Configure SSL/HTTPS
- [ ] Test live site on multiple devices
- [ ] Set up Google Analytics or Plausible

**Dependencies:** Domain registration, DNS access

**Success Criteria:** Live at custom domain, HTTPS active, analytics tracking.

---

### Milestone 4: Post-Launch Enhancements (P1 Features)
**Duration:** Ongoing  
**Deliverables:**
- [ ] Add actual book cover image to replace SVG book faces
- [ ] Add author photos to About section
- [ ] Testimonials / reviews section
- [ ] Email newsletter signup (Mailchimp, ConvertKit)
- [ ] Social media integration (Instagram feed, TikTok embeds)
- [ ] Performance optimization audit
- [ ] Accessibility audit

**Success Criteria:** Feature-complete marketing site with real social proof and email capture.

---

## RISK REGISTER

| Risk | Impact | Likelihood | Mitigation |
|---|---|---|---|
| Book purchase URLs not ready | Can't convert sales | Medium | Use "Coming Soon" or email capture as fallback |
| Contact form spam | Cluttered inbox | Medium | Add honeypot field or reCAPTCHA |
| 3D book slow on old phones | Bad mobile experience | Low | Add reduced-motion media query fallback |
| Domain not available | Can't launch at preferred URL | Low | Have 2-3 backup domain options |
| Authors want design changes | Rework needed | Medium | Review current site together before next milestone |

---

## LAUNCH CHECKLIST

- [ ] All text proofread and approved by authors
- [ ] Purchase links tested and working
- [ ] Contact form delivers to correct email
- [ ] Site loads in < 3s on mobile
- [ ] Responsive design tested on real devices
- [ ] HTTPS configured
- [ ] Analytics installed
- [ ] Social sharing preview (OG tags) verified
- [ ] Favicon visible in browser tab
- [ ] 404 page configured
- [ ] Google Search Console submitted
