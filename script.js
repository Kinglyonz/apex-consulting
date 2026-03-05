/* ========================================
   THE APEX RULE BOOK — JAVASCRIPT v2
   Premium animations, page turns, 3D book
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ==================== ELEMENTS ====================
    const bookIntro = document.getElementById('book-intro');
    const mainSite = document.getElementById('main-site');
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navLinksContainer = document.getElementById('nav-links');
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const pageTurnOverlay = document.getElementById('page-turn-overlay');
    const contactForm = document.getElementById('contact-form');
    const statNumbers = document.querySelectorAll('.stat-number');

    let currentPage = 0;
    let isTransitioning = false;
    let statsAnimated = false;

    // ==================== BOOK OPENING INTRO ====================
    if (bookIntro) {
        bookIntro.addEventListener('click', () => {
            if (bookIntro.classList.contains('opening')) return;
            bookIntro.classList.add('opening');

            // Let the cover rotation fully complete (1.4s) before fading
            setTimeout(() => {
                bookIntro.classList.add('fade-out');
            }, 1400);

            setTimeout(() => {
                bookIntro.style.display = 'none';
                mainSite.classList.remove('hidden');
                requestAnimationFrame(() => {
                    animatePageIn(0);
                    animateStats();
                });
            }, 2200);
        });
    }

    // ==================== NAVIGATION ====================
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinksContainer.classList.toggle('active');
        });
    }

    // Nav link clicks + any [data-page] triggers
    document.querySelectorAll('[data-page]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPage = parseInt(link.getAttribute('data-page'));
            if (targetPage !== currentPage && !isTransitioning) {
                navigateToPage(targetPage);
            }
            if (navToggle) {
                navToggle.classList.remove('active');
                navLinksContainer.classList.remove('active');
            }
        });
    });

    // ==================== PAGE TURN NAVIGATION ====================
    function navigateToPage(targetPage) {
        if (isTransitioning || targetPage === currentPage) return;
        if (targetPage < 0 || targetPage >= pages.length) return;

        isTransitioning = true;
        const direction = targetPage > currentPage ? 'forward' : 'backward';

        // Update active nav link
        navLinks.forEach(l => l.classList.remove('active'));
        navLinks.forEach(l => {
            if (parseInt(l.getAttribute('data-page')) === targetPage) {
                l.classList.add('active');
            }
        });

        // Trigger page turn
        pageTurnOverlay.classList.add(`turning-${direction}`);

        // Swap pages at midpoint of the flip (500ms = just past 90° in 1.0s animation)
        setTimeout(() => {
            pages[currentPage].classList.remove('active');
            pages[targetPage].classList.add('active');
            pages[targetPage].scrollTop = 0;
            currentPage = targetPage;
            animatePageIn(targetPage);

            if (targetPage === 0 && !statsAnimated) {
                animateStats();
            }
        }, 500);

        // Cleanup — slightly after animation ends
        setTimeout(() => {
            pageTurnOverlay.classList.remove(`turning-${direction}`);
            isTransitioning = false;
        }, 1050);
    }

    // ==================== KEYBOARD NAVIGATION ====================
    document.addEventListener('keydown', (e) => {
        if (mainSite.classList.contains('hidden')) return;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            navigateToPage(currentPage + 1);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            navigateToPage(currentPage - 1);
        }
    });

    // ==================== SCROLL / WHEEL NAVIGATION ====================
    let wheelTimeout = null;
    let wheelAccumulator = 0;

    document.addEventListener('wheel', (e) => {
        if (mainSite.classList.contains('hidden')) return;
        if (isTransitioning) return;

        const activePage = pages[currentPage];
        const isAtTop = activePage.scrollTop <= 5;
        const isAtBottom = activePage.scrollTop + activePage.clientHeight >= activePage.scrollHeight - 5;

        if (e.deltaY > 0 && !isAtBottom) return;
        if (e.deltaY < 0 && !isAtTop) return;

        wheelAccumulator += e.deltaY;
        clearTimeout(wheelTimeout);

        wheelTimeout = setTimeout(() => {
            if (Math.abs(wheelAccumulator) > 50) {
                navigateToPage(wheelAccumulator > 0 ? currentPage + 1 : currentPage - 1);
            }
            wheelAccumulator = 0;
        }, 100);
    }, { passive: true });

    // ==================== TOUCH SWIPE ====================
    let touchStartY = 0;
    let touchStartX = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
        if (mainSite.classList.contains('hidden') || isTransitioning) return;

        const diffY = touchStartY - e.changedTouches[0].clientY;
        const diffX = touchStartX - e.changedTouches[0].clientX;

        if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 60) {
            navigateToPage(diffY > 0 ? currentPage + 1 : currentPage - 1);
        }
    }, { passive: true });

    // ==================== ANIMATE PAGE CONTENT IN ====================
    function animatePageIn(pageIndex) {
        const page = pages[pageIndex];
        const elements = page.querySelectorAll(
            '.section-header, .about-card, .law-card, .consult-card, .price-card, ' +
            '.hero-text > *, .hero-book-display, .about-quote, .laws-cta, .consult-intro, ' +
            '.contact-info, .contact-form, .book-showcase, .book-details, .site-footer'
        );

        elements.forEach((el, i) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'none';

            setTimeout(() => {
                el.style.transition = 'opacity 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 100 + i * 70);
        });
    }

    // ==================== STAT COUNTER ANIMATION ====================
    function animateStats() {
        statsAnimated = true;
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2200;
            const start = performance.now();

            function update(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 4); // quartic ease out
                stat.textContent = Math.round(eased * target);
                if (progress < 1) requestAnimationFrame(update);
            }
            requestAnimationFrame(update);
        });
    }

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

    // ==================== NOTIFY FORMS (book launch) ====================
    function handleNotifyForm(form) {
        if (!form) return;
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const input = form.querySelector('.notify-input');
            const originalHTML = btn.innerHTML;

            btn.innerHTML = '<span class="btn-shine"></span>Sending...';
            btn.disabled = true;
            input.disabled = true;

            setTimeout(() => {
                btn.innerHTML = 'You\'re on the list ✓';
                btn.style.background = 'linear-gradient(135deg, #2d5a27, #4a8c3f)';
                btn.style.color = '#fff';

                setTimeout(() => {
                    form.reset();
                    btn.innerHTML = originalHTML;
                    btn.style.background = '';
                    btn.style.color = '';
                    btn.disabled = false;
                    input.disabled = false;
                }, 3500);
            }, 1200);
        });
    }

    handleNotifyForm(document.getElementById('notify-form'));
    handleNotifyForm(document.getElementById('book-notify-form'));

    // ==================== CONTACT FORM ====================
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalHTML = btn.innerHTML;

            btn.innerHTML = '<span class="btn-shine"></span>Sending...';
            btn.style.opacity = '0.7';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = 'Message Sent ✓';
                btn.style.background = 'linear-gradient(135deg, #2d5a27, #4a8c3f)';
                btn.style.opacity = '1';

                setTimeout(() => {
                    contactForm.reset();
                    btn.innerHTML = originalHTML;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }


    // ==================== CARD HOVER TILT EFFECT ====================
    function addTiltEffect() {
        const cards = document.querySelectorAll('.law-card, .about-card, .consult-card');
        
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
    }

    // Initialize tilt after a short delay
    setTimeout(addTiltEffect, 3000);

    // ==================== COVER IMAGE UPGRADE ====================
    // When the real book cover image exists, swap out the CSS text design
    const coverImg = new Image();
    coverImg.onload = () => {
        document.querySelectorAll('.book-front').forEach(el => el.classList.add('cover-loaded'));
        document.querySelectorAll('.cover-front').forEach(el => el.classList.add('cover-loaded'));
    };
    coverImg.src = 'images/book-cover.jpg';

    // Book back is intentionally plain black — no image loaded

    // ==================== PRELOAD ====================
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });

});
