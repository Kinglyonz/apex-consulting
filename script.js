/* ========================================
   THE APEX RULE BOOK — JAVASCRIPT v9
   Regular scroll, 3D book, animations,
   Supabase signup + contact storage
   ======================================== */

// ==================== SUPABASE ====================
const SUPABASE_URL = 'https://zutzzmsqrwzpmppqrlod.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1dHp6bXNxcnd6cG1wcHFybG9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2NzU4MDAsImV4cCI6MjA4ODI1MTgwMH0.LN_lerVVyX-HGZs0g3UthRqZy6CBSRVi5N7ZZNik2Cc';
const db = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function saveSignup(email, source) {
    const { error } = await db.from('signups').insert({ email, source });
    if (error) console.error('Signup error:', error.message);
    return !error;
}

async function saveContact(name, email, subject, message) {
    const { error } = await db.from('contacts').insert({ name, email, subject, message });
    if (error) console.error('Contact error:', error.message);
    return !error;
}

document.addEventListener('DOMContentLoaded', () => {

    // ==================== ELEMENTS ====================
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navLinksContainer = document.getElementById('nav-links');
    const navLinks = document.querySelectorAll('.nav-link');
    const statNumbers = document.querySelectorAll('.stat-number');

    // ==================== NAVIGATION TOGGLE ====================
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinksContainer.classList.toggle('active');
        });
    }

    // Smooth scroll for [data-page] and nav links
    document.querySelectorAll('[data-page], .nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
            if (navToggle) {
                navToggle.classList.remove('active');
                navLinksContainer.classList.remove('active');
            }
        });
    });

    // ==================== ACTIVE NAV ON SCROLL ====================
    const sections = document.querySelectorAll('.page[id]');

    function updateActiveNav() {
        const scrollY = window.scrollY + 100;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach(l => l.classList.remove('active'));
                const active = document.querySelector(`.nav-link[href="#${id}"]`);
                if (active) active.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });

    // ==================== NAVBAR SCROLL STYLE ====================
    window.addEventListener('scroll', () => {
        if (navbar) {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        }
    }, { passive: true });

    // ==================== STAT COUNTER ANIMATION ====================
    let statsAnimated = false;

    function animateStats() {
        if (statsAnimated) return;
        statsAnimated = true;
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2200;
            const start = performance.now();

            function update(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 4);
                stat.textContent = Math.round(eased * target);
                if (progress < 1) requestAnimationFrame(update);
            }
            requestAnimationFrame(update);
        });
    }

    // Trigger stats when hero is visible
    const heroSection = document.getElementById('home');
    if (heroSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) animateStats();
        }, { threshold: 0.3 });
        observer.observe(heroSection);
        animateStats();
    }

    // ==================== SCROLL-TRIGGERED FADE IN ====================
    const fadeElements = document.querySelectorAll(
        '.section-header, .about-card, .law-card, ' +
        '.hero-text > *, .hero-book-display, .about-quote, .laws-cta, ' +
        '.contact-info, .contact-form, .book-showcase, .book-details, .site-footer'
    );

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        fadeObserver.observe(el);
    });

    // ==================== INTERACTIVE 3D BOOK ====================
    const floatingBook = document.getElementById('floating-book');

    if (floatingBook) {
        const book3d = floatingBook.querySelector('.book-3d');
        let isHovering = false;

        floatingBook.addEventListener('mouseenter', () => {
            isHovering = true;
            book3d.style.animationPlayState = 'paused';
        });

        floatingBook.addEventListener('mouseleave', () => {
            isHovering = false;
            book3d.style.animationPlayState = 'running';
            book3d.style.transform = '';
        });

        floatingBook.addEventListener('mousemove', (e) => {
            if (!isHovering) return;
            const rect = floatingBook.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            book3d.style.transform = `rotateY(${x * 45}deg) rotateX(${-y * 20}deg)`;
        });
    }

    // ==================== NOTIFY FORMS ====================
    function handleNotifyForm(form, source) {
        if (!form) return;
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const input = form.querySelector('.notify-input');
            const email = input.value.trim();
            const originalHTML = btn.innerHTML;

            btn.innerHTML = '<span class="btn-shine"></span>Saving...';
            btn.disabled = true;
            input.disabled = true;

            const ok = await saveSignup(email, source);

            if (ok) {
                btn.innerHTML = 'You\'re on the list ✓';
                btn.style.background = 'linear-gradient(135deg, #2d5a27, #4a8c3f)';
                btn.style.color = '#fff';
            } else {
                btn.innerHTML = 'Try again';
                btn.style.background = 'linear-gradient(135deg, #5a2727, #8c3f3f)';
            }

            setTimeout(() => {
                form.reset();
                btn.innerHTML = originalHTML;
                btn.style.background = '';
                btn.style.color = '';
                btn.disabled = false;
                input.disabled = false;
            }, 3500);
        });
    }

    handleNotifyForm(document.getElementById('notify-form'), 'hero');
    handleNotifyForm(document.getElementById('book-notify-form'), 'book');

    // ==================== CONTACT FORM ====================
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalHTML = btn.innerHTML;

            const name = contactForm.querySelector('[name="name"]')?.value.trim() || '';
            const email = contactForm.querySelector('[name="email"]')?.value.trim() || '';
            const subject = contactForm.querySelector('[name="subject"]')?.value.trim() || '';
            const message = contactForm.querySelector('[name="message"]')?.value.trim() || '';

            btn.innerHTML = '<span class="btn-shine"></span>Sending...';
            btn.style.opacity = '0.7';
            btn.disabled = true;

            const ok = await saveContact(name, email, subject, message);

            if (ok) {
                btn.innerHTML = 'Message Sent ✓';
                btn.style.background = 'linear-gradient(135deg, #2d5a27, #4a8c3f)';
            } else {
                btn.innerHTML = 'Try again';
                btn.style.background = 'linear-gradient(135deg, #5a2727, #8c3f3f)';
            }
            btn.style.opacity = '1';

            setTimeout(() => {
                contactForm.reset();
                btn.innerHTML = originalHTML;
                btn.style.background = '';
                btn.disabled = false;
            }, 3000);
        });
    }

    // ==================== CARD HOVER TILT ====================
    const cards = document.querySelectorAll('.law-card, .about-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `translateY(-6px) perspective(600px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // ==================== COVER IMAGE UPGRADE ====================
    const coverImg = new Image();
    coverImg.onload = () => {
        document.querySelectorAll('.book-front').forEach(el => el.classList.add('cover-loaded'));
    };
    coverImg.src = 'images/book-cover.jpg';

    // ==================== PRELOAD ====================
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });

});
