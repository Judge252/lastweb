/* =========================================================
   COMPLETE SCRIPT.JS
   Premium Clinic Website Interactions
   Works with the new index.html + style.css structure
========================================================= */

'use strict';

/* =========================================================
   01. Helpers
========================================================= */

const qs = (selector, parent = document) => parent.querySelector(selector);
const qsa = (selector, parent = document) => Array.from(parent.querySelectorAll(selector));

function debounce(callback, delay = 100) {
    let timeoutId;

    return (...args) => {
        window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => callback(...args), delay);
    };
}

function throttle(callback, delay = 100) {
    let waiting = false;

    return (...args) => {
        if (waiting) return;

        callback(...args);
        waiting = true;

        window.setTimeout(() => {
            waiting = false;
        }, delay);
    };
}

function isReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getHeaderOffset() {
    const header = qs('#header');
    if (!header) return 90;

    return header.offsetHeight + 28;
}

function safeEncode(value) {
    return encodeURIComponent(String(value || '').trim());
}

/* =========================================================
   02. Mobile Navigation
========================================================= */

const hamburger = qs('#hamburger');
const navMenu = qs('#navMenu');
const header = qs('#header');

function openMobileMenu() {
    if (!hamburger || !navMenu) return;

    hamburger.classList.add('active');
    navMenu.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    if (!hamburger || !navMenu) return;

    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
}

function toggleMobileMenu() {
    if (!hamburger || !navMenu) return;

    const isOpen = navMenu.classList.contains('active');

    if (isOpen) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

if (hamburger && navMenu) {
    hamburger.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleMobileMenu();
    });

    navMenu.addEventListener('click', (event) => {
        const clickedLink = event.target.closest('a');

        if (clickedLink) {
            closeMobileMenu();
        }
    });

    document.addEventListener('click', (event) => {
        const clickedInsideMenu = navMenu.contains(event.target);
        const clickedHamburger = hamburger.contains(event.target);

        if (!clickedInsideMenu && !clickedHamburger) {
            closeMobileMenu();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMobileMenu();
        }
    });
}

/* =========================================================
   03. Smooth Scroll
========================================================= */

function scrollToTarget(targetId) {
    if (!targetId || targetId === '#') return;

    const target = qs(targetId);
    if (!target) return;

    const targetTop = target.getBoundingClientRect().top + window.scrollY;
    const offset = getHeaderOffset();

    window.scrollTo({
        top: targetTop - offset,
        behavior: isReducedMotion() ? 'auto' : 'smooth'
    });
}

qsa('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
        const targetId = anchor.getAttribute('href');

        if (!targetId || targetId === '#') return;

        const target = qs(targetId);
        if (!target) return;

        event.preventDefault();
        closeMobileMenu();
        scrollToTarget(targetId);
    });
});

/* =========================================================
   04. Header Scroll State
========================================================= */

function updateHeaderOnScroll() {
    if (!header) return;

    const scrolled = window.scrollY > 20;

    header.classList.toggle('is-scrolled', scrolled);

    if (scrolled) {
        header.style.boxShadow = '0 24px 70px rgba(15, 23, 42, 0.16)';
        header.style.background = 'rgba(255, 255, 255, 0.72)';
    } else {
        header.style.boxShadow = '';
        header.style.background = '';
    }
}

window.addEventListener('scroll', throttle(updateHeaderOnScroll, 80), { passive: true });
window.addEventListener('load', updateHeaderOnScroll);

/* =========================================================
   05. Active Navigation Link
========================================================= */

const sectionLinks = qsa('.nav-link[href^="#"]');
const observedSections = sectionLinks
    .map((link) => {
        const id = link.getAttribute('href');
        return id ? qs(id) : null;
    })
    .filter(Boolean);

function setActiveNavLink(sectionId) {
    sectionLinks.forEach((link) => {
        const isActive = link.getAttribute('href') === `#${sectionId}`;
        link.classList.toggle('active', isActive);
    });
}

if ('IntersectionObserver' in window && observedSections.length) {
    const navObserver = new IntersectionObserver(
        (entries) => {
            const visibleEntries = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

            if (visibleEntries.length) {
                setActiveNavLink(visibleEntries[0].target.id);
            }
        },
        {
            root: null,
            threshold: [0.2, 0.35, 0.5],
            rootMargin: '-20% 0px -55% 0px'
        }
    );

    observedSections.forEach((section) => navObserver.observe(section));
}

/* =========================================================
   06. Minimum Date for Booking Inputs
========================================================= */

function getTodayDateString() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

function setMinimumBookingDates() {
    const minDate = getTodayDateString();

    qsa('.date-input').forEach((input) => {
        input.setAttribute('min', minDate);

        input.addEventListener('change', () => {
            if (input.value) {
                input.classList.add('has-value');
                input.style.borderColor = 'rgba(37, 99, 235, 0.45)';
            } else {
                input.classList.remove('has-value');
                input.style.borderColor = '';
            }
        });
    });
}

setMinimumBookingDates();

/* =========================================================
   07. Arabic Date Formatting
========================================================= */

function formatDateArabic(dateValue) {
    if (!dateValue) return '';

    const date = new Date(`${dateValue}T12:00:00`);

    if (Number.isNaN(date.getTime())) {
        return dateValue;
    }

    const arabicMonths = [
        'يناير',
        'فبراير',
        'مارس',
        'أبريل',
        'مايو',
        'يونيو',
        'يوليو',
        'أغسطس',
        'سبتمبر',
        'أكتوبر',
        'نوفمبر',
        'ديسمبر'
    ];

    const day = date.getDate();
    const month = arabicMonths[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
}

/* =========================================================
   08. WhatsApp Booking Function
   Important: kept global because HTML uses onclick=""
========================================================= */

function bookAppointment(branchName, phoneNumber, dateInputId) {
    const dateInput = qs(`#${dateInputId}`);

    if (!dateInput) {
        alert('حدث خطأ في تحديد حقل التاريخ. يرجى المحاولة مرة أخرى.');
        return;
    }

    const selectedDate = dateInput.value;

    if (!selectedDate) {
        alert('يرجى اختيار تاريخ الحجز أولاً.');
        dateInput.focus();
        return;
    }

    const formattedDate = formatDateArabic(selectedDate);

    const message = [
        'مرحباً، أريد حجز موعد.',
        '',
        `الفرع: ${branchName}`,
        `التاريخ المطلوب: ${formattedDate}`,
        '',
        'يرجى تأكيد أقرب موعد متاح. شكراً.'
    ].join('\n');

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${safeEncode(message)}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
}

window.bookAppointment = bookAppointment;

/* =========================================================
   09. Contact Form to WhatsApp
========================================================= */

const contactForm = qs('#contactForm');

function validatePhoneNumber(phone) {
    const cleanedPhone = String(phone || '').trim();
    const phoneRegex = /^[0-9+\-\s()]{7,20}$/;

    return phoneRegex.test(cleanedPhone);
}

if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const nameInput = qs('#name');
        const phoneInput = qs('#phone');
        const messageInput = qs('#message');

        const name = nameInput ? nameInput.value.trim() : '';
        const phone = phoneInput ? phoneInput.value.trim() : '';
        const message = messageInput ? messageInput.value.trim() : '';

        if (!name || !phone || !message) {
            alert('يرجى ملء جميع الحقول قبل الإرسال.');
            return;
        }

        if (!validatePhoneNumber(phone)) {
            alert('يرجى إدخال رقم هاتف صحيح.');
            phoneInput.focus();
            return;
        }

        const whatsappMessage = [
            'مرحباً، أريد التواصل مع العيادة.',
            '',
            `الاسم: ${name}`,
            `رقم الهاتف: ${phone}`,
            '',
            'الرسالة:',
            message
        ].join('\n');

        const defaultPhone = '972526020026';
        const whatsappUrl = `https://wa.me/${defaultPhone}?text=${safeEncode(whatsappMessage)}`;

        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

        contactForm.reset();

        qsa('.form-group').forEach((group) => {
            group.classList.remove('focused', 'has-value');
        });
    });
}

/* =========================================================
   10. Form Input Focus States
========================================================= */

qsa('.form-group input, .form-group textarea').forEach((input) => {
    const group = input.closest('.form-group');

    input.addEventListener('focus', () => {
        if (group) group.classList.add('focused');
    });

    input.addEventListener('blur', () => {
        if (!group) return;

        group.classList.remove('focused');
        group.classList.toggle('has-value', Boolean(input.value.trim()));
    });

    input.addEventListener('input', () => {
        if (!group) return;

        group.classList.toggle('has-value', Boolean(input.value.trim()));
    });
});

/* =========================================================
   11. Scroll Reveal Animations
========================================================= */

function initScrollReveal() {
    const revealItems = qsa([
        '.section-heading',
        '.service-card',
        '.treatment-card',
        '.team-card',
        '.feature-card',
        '.booking-card',
        '.testimonial-card',
        '.contact-item',
        '.contact-form'
    ].join(','));

    if (!revealItems.length) return;

    if (!('IntersectionObserver' in window) || isReducedMotion()) {
        revealItems.forEach((item) => item.classList.add('fade-in'));
        return;
    }

    revealItems.forEach((item) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(28px)';
    });

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const item = entry.target;

                item.classList.add('fade-in');
                item.style.opacity = '';
                item.style.transform = '';

                observer.unobserve(item);
            });
        },
        {
            threshold: 0.12,
            rootMargin: '0px 0px -70px 0px'
        }
    );

    revealItems.forEach((item, index) => {
        item.style.transitionDelay = `${Math.min(index % 6, 5) * 45}ms`;
        revealObserver.observe(item);
    });
}

/* =========================================================
   12. Card Touch / Pointer Feedback
========================================================= */

function initCardPressFeedback() {
    const cards = qsa('.glass-card, .btn, .floating-cta-btn');

    cards.forEach((card) => {
        card.addEventListener('pointerdown', () => {
            card.classList.add('is-pressed');
        });

        card.addEventListener('pointerup', () => {
            card.classList.remove('is-pressed');
        });

        card.addEventListener('pointerleave', () => {
            card.classList.remove('is-pressed');
        });

        card.addEventListener('pointercancel', () => {
            card.classList.remove('is-pressed');
        });
    });
}

/* =========================================================
    13. Floating CTA Behavior
========================================================= */

function initFloatingCTA() {
    const floatingCta = qs('.floating-cta');
    const bookingSection = qs('#booking');
    const footer = qs('.footer');

    if (!floatingCta) return;

    function updateFloatingCTA() {
        const isDesktop = window.matchMedia('(min-width: 768px)').matches;

        if (isDesktop) {
            floatingCta.style.display = 'none';
            return;
        }

        floatingCta.style.display = '';

        let shouldHide = false;

        if (bookingSection) {
            const bookingRect = bookingSection.getBoundingClientRect();

            if (bookingRect.top < window.innerHeight * 0.75 && bookingRect.bottom > window.innerHeight * 0.2) {
                shouldHide = true;
            }
        }

        if (footer) {
            const footerRect = footer.getBoundingClientRect();

            if (footerRect.top < window.innerHeight - 80) {
                shouldHide = true;
            }
        }

        floatingCta.style.opacity = shouldHide ? '0' : '1';
        floatingCta.style.transform = shouldHide ? 'translateY(20px)' : 'translateY(0)';
        floatingCta.style.pointerEvents = shouldHide ? 'none' : 'none';

        const ctaButton = qs('.floating-cta-btn', floatingCta);
        if (ctaButton) {
            ctaButton.style.pointerEvents = shouldHide ? 'none' : 'auto';
        }
    }

    updateFloatingCTA();

    window.addEventListener('scroll', throttle(updateFloatingCTA, 120), { passive: true });
    window.addEventListener('resize', debounce(updateFloatingCTA, 160));
}

/* =========================================================
   15. Image Loading Enhancements
========================================================= */

function initImages() {
    const fallbackImages = [
        'assets/images/hero/hero.jpeg',
        'assets/images/hero/hero-2.jpg',
        'assets/images/hero/hero-3.jpg',
        'assets/images/services/medical-massage.jpg',
        'assets/images/services/dry-cupping.jpg'
    ];

    qsa('img').forEach((img, index) => {
        if (!img.hasAttribute('loading') && !img.hasAttribute('fetchpriority')) {
            img.setAttribute('loading', 'lazy');
        }

        img.addEventListener('load', () => {
            img.classList.add('is-loaded');
        });

        img.addEventListener('error', () => {
            if (img.dataset.fallbackApplied === 'true') return;

            img.dataset.fallbackApplied = 'true';
            img.src = fallbackImages[index % fallbackImages.length];
        });
    });
}

/* =========================================================
   16. External Link Safety
========================================================= */

function secureExternalLinks() {
    qsa('a[target="_blank"]').forEach((link) => {
        const currentRel = link.getAttribute('rel') || '';
        const relValues = new Set(currentRel.split(' ').filter(Boolean));

        relValues.add('noopener');
        relValues.add('noreferrer');

        link.setAttribute('rel', Array.from(relValues).join(' '));
    });
}

/* =========================================================
   17. Auto Year in Footer
========================================================= */

function updateFooterYear() {
    const footerBottom = qs('.footer-bottom p');
    if (!footerBottom) return;

    const currentYear = new Date().getFullYear();

    footerBottom.innerHTML = `&copy; ${currentYear} عيادة العلاج الطبيعي والتأهيل. جميع الحقوق محفوظة.`;
}

/* =========================================================
   18. Improve Keyboard Accessibility
========================================================= */

function initKeyboardAccessibility() {
    qsa('.nav-link, .btn, .whatsapp-btn, .social-link, .floating-cta-btn').forEach((item) => {
        item.addEventListener('keyup', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                item.classList.add('keyboard-active');

                window.setTimeout(() => {
                    item.classList.remove('keyboard-active');
                }, 180);
            }
        });
    });
}

/* =========================================================
   19. Optional Desktop Card Tilt
========================================================= */

function initDesktopCardTilt() {
    if (isReducedMotion()) return;

    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!canHover) return;

    const tiltCards = qsa('.service-card, .treatment-card, .team-card, .feature-card');

    tiltCards.forEach((card) => {
        card.addEventListener('mousemove', (event) => {
            const rect = card.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const rotateY = ((x / rect.width) - 0.5) * -5;
            const rotateX = ((y / rect.height) - 0.5) * 5;

            card.style.transform = `translateY(-6px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

/* =========================================================
   20. WhatsApp Button Pulse
========================================================= */

function initWhatsAppPulse() {
    const buttons = qsa('.whatsapp-btn, .btn-book, .floating-cta-btn');

    buttons.forEach((button) => {
        button.addEventListener('mouseenter', () => {
            if (isReducedMotion()) return;

            button.style.animation = 'pulseGlow 700ms ease-in-out';
        });

        button.addEventListener('animationend', () => {
            button.style.animation = '';
        });
    });
}

/* =========================================================
   21. Initialize Everything
========================================================= */

document.addEventListener('DOMContentLoaded', () => {
    setMinimumBookingDates();
    initScrollReveal();
    initCardPressFeedback();
    initFloatingCTA();
    initImages();
    secureExternalLinks();
    updateFooterYear();
    initKeyboardAccessibility();
    initDesktopCardTilt();
    initWhatsAppPulse();
    updateHeaderOnScroll();

    console.log(
        '%cعيادة العلاج الطبيعي والتأهيل',
        'color:#2563eb;font-size:20px;font-weight:900;'
    );

    console.log(
        '%cتم تحميل الموقع بنجاح بتصميم زجاجي متجاوب.',
        'color:#06b6d4;font-size:14px;font-weight:700;'
    );
});

/* =========================================================
   22. Window Load Polish
========================================================= */

window.addEventListener('load', () => {
    document.body.classList.add('page-loaded');

    qsa('.hero-top-image img').forEach((img) => {
        img.classList.add('is-loaded');
    });
});