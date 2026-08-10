/* =========================================================
   COMPLETE SCRIPT.JS
   Responsive Arabic RTL Medical Website Interactions
========================================================= */

'use strict';

/* =========================================================
   01. Helpers
========================================================= */

const qs = (selector, parent = document) => parent.querySelector(selector);

const qsa = (selector, parent = document) =>
    Array.from(parent.querySelectorAll(selector));

function debounce(callback, delay = 120) {
    let timeoutId;

    return (...args) => {
        window.clearTimeout(timeoutId);

        timeoutId = window.setTimeout(() => {
            callback(...args);
        }, delay);
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

function prefersReducedMotion() {
    return window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches;
}

function getHeaderOffset() {
    const header = qs('#header');

    return header
        ? header.offsetHeight + 24
        : 96;
}

function openSecureWindow(url) {
    const openedWindow = window.open(
        url,
        '_blank',
        'noopener,noreferrer'
    );

    if (openedWindow) {
        openedWindow.opener = null;
    }
}

/* =========================================================
   02. Mobile Navigation
========================================================= */

function initMobileNavigation() {
    const hamburger = qs('#hamburger');
    const navMenu = qs('#navMenu');

    if (!hamburger || !navMenu) return;

    const desktopQuery = window.matchMedia(
        '(min-width: 1024px)'
    );

    function setMenuState(
        isOpen,
        { returnFocus = false } = {}
    ) {
        hamburger.classList.toggle('active', isOpen);
        navMenu.classList.toggle('active', isOpen);

        hamburger.setAttribute(
            'aria-expanded',
            String(isOpen)
        );

        hamburger.setAttribute(
            'aria-label',
            isOpen
                ? 'إغلاق القائمة'
                : 'فتح القائمة'
        );

        document.body.style.overflow = isOpen
            ? 'hidden'
            : '';

        if (returnFocus) {
            hamburger.focus();
        }
    }

    function closeMenu(options) {
        setMenuState(false, options);
    }

    hamburger.addEventListener('click', (event) => {
        event.stopPropagation();

        const isOpen =
            hamburger.getAttribute('aria-expanded') ===
            'true';

        setMenuState(!isOpen);

        if (!isOpen) {
            const firstLink = qs('a', navMenu);

            if (firstLink) {
                firstLink.focus({
                    preventScroll: true
                });
            }
        }
    });

    navMenu.addEventListener('click', (event) => {
        if (event.target.closest('a')) {
            closeMenu();
        }
    });

    document.addEventListener('click', (event) => {
        if (!navMenu.classList.contains('active')) {
            return;
        }

        const clickedInsideMenu = navMenu.contains(
            event.target
        );

        const clickedHamburger = hamburger.contains(
            event.target
        );

        if (
            !clickedInsideMenu &&
            !clickedHamburger
        ) {
            closeMenu();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (
            event.key === 'Escape' &&
            navMenu.classList.contains('active')
        ) {
            closeMenu({
                returnFocus: true
            });
        }
    });

    const handleDesktopChange = (event) => {
        if (event.matches) {
            closeMenu();
        }
    };

    if (
        typeof desktopQuery.addEventListener ===
        'function'
    ) {
        desktopQuery.addEventListener(
            'change',
            handleDesktopChange
        );
    } else {
        desktopQuery.addListener(
            handleDesktopChange
        );
    }
}

/* =========================================================
   03. Smooth Internal Navigation
========================================================= */

function initSmoothScroll() {
    qsa('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (event) => {
            const targetId =
                anchor.getAttribute('href');

            if (
                !targetId ||
                targetId === '#'
            ) {
                return;
            }

            let target;

            try {
                target = qs(targetId);
            } catch (error) {
                return;
            }

            if (!target) return;

            event.preventDefault();

            const targetTop =
                target.getBoundingClientRect().top +
                window.scrollY;

            window.scrollTo({
                top: Math.max(
                    0,
                    targetTop - getHeaderOffset()
                ),
                behavior: prefersReducedMotion()
                    ? 'auto'
                    : 'smooth'
            });
        });
    });
}

/* =========================================================
   04. Header Scroll State
========================================================= */

function initHeaderScrollState() {
    const header = qs('#header');

    if (!header) return;

    const updateHeader = () => {
        header.classList.toggle(
            'is-scrolled',
            window.scrollY > 20
        );
    };

    updateHeader();

    window.addEventListener(
        'scroll',
        throttle(updateHeader, 80),
        {
            passive: true
        }
    );
}

/* =========================================================
   05. Active Navigation Link
========================================================= */

function initActiveNavigation() {
    const sectionLinks = qsa(
        '.nav-link[href^="#"]'
    );

    if (
        !sectionLinks.length ||
        !('IntersectionObserver' in window)
    ) {
        return;
    }

    const sectionMap = new Map();

    sectionLinks.forEach((link) => {
        const href = link.getAttribute('href');

        if (
            !href ||
            href === '#'
        ) {
            return;
        }

        let section;

        try {
            section = qs(href);
        } catch (error) {
            return;
        }

        if (section) {
            sectionMap.set(section, link);
        }
    });

    if (!sectionMap.size) return;

    const observer = new IntersectionObserver(
        (entries) => {
            const visibleEntry = entries
                .filter(
                    (entry) =>
                        entry.isIntersecting
                )
                .sort(
                    (firstEntry, secondEntry) =>
                        secondEntry.intersectionRatio -
                        firstEntry.intersectionRatio
                )[0];

            if (!visibleEntry) return;

            sectionLinks.forEach((link) => {
                const isActive =
                    link ===
                    sectionMap.get(
                        visibleEntry.target
                    );

                link.classList.toggle(
                    'active',
                    isActive
                );

                if (isActive) {
                    link.setAttribute(
                        'aria-current',
                        'page'
                    );
                } else {
                    link.removeAttribute(
                        'aria-current'
                    );
                }
            });
        },
        {
            threshold: [
                0.2,
                0.35,
                0.5
            ],
            rootMargin:
                '-18% 0px -58% 0px'
        }
    );

    sectionMap.forEach(
        (link, section) => {
            observer.observe(section);
        }
    );
}

/* =========================================================
   06. Specialist Experience
   Carousel + Bottom Sheet + Accordion
========================================================= */

let specialistCarouselIndex = 0;
let specialistCardsList = [];
let activeSpecialistTriggerBtn = null;
let previousBodyOverflow = '';

function isMobileViewport() {
    return window.matchMedia(
        '(max-width: 767px)'
    ).matches;
}

function getSpecialistInitials(card, name = '') {
    const avatar = qs(
        '[data-specialist-avatar]',
        card
    );

    const savedInitials =
        avatar?.dataset.specialistInitials?.trim();

    if (savedInitials) {
        return savedInitials;
    }

    const ignoredWords = new Set([
        'البروفيسور',
        'الدكتور',
        'الدكتورة',
        'الأستاذ',
        'الأستاذة'
    ]);

    const nameParts = name
        .split(/\s+/)
        .map((part) => part.trim())
        .filter(
            (part) =>
                part &&
                !ignoredWords.has(part)
        );

    return nameParts
        .slice(0, 2)
        .map((part) => part.charAt(0))
        .join(' ');
}

function convertSpecialistAvatarToFallback(card) {
    const avatar = qs(
        '[data-specialist-avatar]',
        card
    );

    const name =
        qs('.team-name', card)
            ?.textContent.trim() ||
        'عضو الفريق';

    if (!avatar) return;

    const initials =
        getSpecialistInitials(card, name);

    avatar.dataset.specialistAvatarType =
        'fallback';

    avatar.dataset.specialistInitials =
        initials;

    avatar.classList.add(
        'team-avatar-fallback'
    );

    avatar.setAttribute(
        'role',
        'img'
    );

    avatar.setAttribute(
        'aria-label',
        `صورة بديلة لـ${name}`
    );

    const image = qs(
        '[data-specialist-image], img',
        avatar
    );

    if (image) {
        image.remove();
    }

    if (!qs('.fa-user-doctor', avatar)) {
        const icon =
            document.createElement('i');

        icon.className =
            'fa-solid fa-user-doctor';

        icon.setAttribute(
            'aria-hidden',
            'true'
        );

        avatar.append(icon);
    }

    let initialsElement = qs(
        '.team-avatar-initials',
        avatar
    );

    if (!initialsElement) {
        initialsElement =
            document.createElement('span');

        initialsElement.className =
            'team-avatar-initials';

        initialsElement.setAttribute(
            'aria-hidden',
            'true'
        );

        avatar.append(initialsElement);
    }

    initialsElement.textContent =
        initials;
}

function initSpecialistAvatar(card) {
    const avatar = qs(
        '[data-specialist-avatar]',
        card
    );

    const image = qs(
        '[data-specialist-image]',
        card
    );

    if (
        !avatar ||
        avatar.dataset.specialistAvatarType !==
            'image' ||
        !image
    ) {
        return;
    }

    const handleImageError = () =>
        convertSpecialistAvatarToFallback(card);

    image.addEventListener(
        'error',
        handleImageError,
        {
            once: true
        }
    );

    if (
        image.complete &&
        image.naturalWidth === 0
    ) {
        handleImageError();
    }
}

function initSpecialistExperience() {
    specialistCardsList = qsa(
        '[data-specialist-card]'
    );

    if (!specialistCardsList.length) {
        return;
    }

    specialistCardsList.forEach((card) => {
        const button = qs(
            '[data-specialist-toggle]',
            card
        );

        const drawer = qs(
            '.team-drawer',
            card
        );

        const name =
            qs('.team-name', card)
                ?.textContent.trim() ||
            'عضو الفريق';

        initSpecialistAvatar(card);

        if (!button || !drawer) {
            return;
        }

        const controlsId =
            button.getAttribute(
                'aria-controls'
            );

        if (
            controlsId &&
            drawer.id !== controlsId
        ) {
            drawer.id = controlsId;
        }

        button.setAttribute(
            'aria-expanded',
            'false'
        );

        button.setAttribute(
            'aria-label',
            `عرض تفاصيل ${name}`
        );

        drawer.setAttribute(
            'aria-hidden',
            'true'
        );

        card.classList.remove(
            'is-expanded'
        );

        button.addEventListener(
            'click',
            (event) => {
                event.preventDefault();

                if (isMobileViewport()) {
                    openSpecialistSheet(
                        card,
                        button
                    );

                    return;
                }

                const isExpanded =
                    card.classList.contains(
                        'is-expanded'
                    );

                if (!isExpanded) {
                    specialistCardsList.forEach(
                        (otherCard) => {
                            if (
                                otherCard !== card
                            ) {
                                setDesktopSpecialistState(
                                    otherCard,
                                    false
                                );
                            }
                        }
                    );
                }

                setDesktopSpecialistState(
                    card,
                    !isExpanded
                );
            }
        );
    });

    initMobileSpecialistCarousel();
    attachSpecialistModalListeners();

    document.addEventListener(
        'keydown',
        (event) => {
            if (event.key !== 'Escape') {
                return;
            }

            const overlay = qs(
                '#specialistModalOverlay'
            );

            if (
                overlay?.getAttribute(
                    'aria-hidden'
                ) === 'false'
            ) {
                closeSpecialistSheet();
                return;
            }

            if (!isMobileViewport()) {
                const expandedCard =
                    specialistCardsList.find(
                        (card) =>
                            card.classList.contains(
                                'is-expanded'
                            )
                    );

                if (expandedCard) {
                    const button = qs(
                        '[data-specialist-toggle]',
                        expandedCard
                    );

                    setDesktopSpecialistState(
                        expandedCard,
                        false
                    );

                    button?.focus();
                }
            }
        }
    );

    const desktopQuery =
        window.matchMedia(
            '(min-width: 768px)'
        );

    const handleViewportChange = (
        event
    ) => {
        if (event.matches) {
            closeSpecialistSheet({
                returnFocus: false
            });

            return;
        }

        specialistCardsList.forEach(
            (card) => {
                setDesktopSpecialistState(
                    card,
                    false
                );
            }
        );

        updateSpecialistCarouselFromPosition();
    };

    if (
        typeof desktopQuery.addEventListener ===
        'function'
    ) {
        desktopQuery.addEventListener(
            'change',
            handleViewportChange
        );
    } else {
        desktopQuery.addListener(
            handleViewportChange
        );
    }
}

function setDesktopSpecialistState(
    card,
    expanded
) {
    const button = qs(
        '[data-specialist-toggle]',
        card
    );

    const drawer = qs(
        '.team-drawer',
        card
    );

    const label = qs(
        '.expand-btn-label',
        card
    );

    const name =
        qs('.team-name', card)
            ?.textContent.trim() ||
        'عضو الفريق';

    if (!button || !drawer) {
        return;
    }

    card.classList.toggle(
        'is-expanded',
        expanded
    );

    button.setAttribute(
        'aria-expanded',
        String(expanded)
    );

    button.setAttribute(
        'aria-label',
        expanded
            ? `إخفاء تفاصيل ${name}`
            : `عرض تفاصيل ${name}`
    );

    drawer.setAttribute(
        'aria-hidden',
        String(!expanded)
    );

    if (label) {
        label.textContent = expanded
            ? 'إخفاء التفاصيل'
            : 'عرض التفاصيل';
    }
}

function initMobileSpecialistCarousel() {
    const teamGrid = qs('.team-grid');

    const prevBtn = qs(
        '#teamCarouselPrev'
    );

    const nextBtn = qs(
        '#teamCarouselNext'
    );

    if (
        !teamGrid ||
        !specialistCardsList.length
    ) {
        return;
    }

    updateSpecialistCarouselState(0);

    prevBtn?.addEventListener(
        'click',
        () => {
            scrollSpecialistCardToView(
                specialistCarouselIndex - 1
            );
        }
    );

    nextBtn?.addEventListener(
        'click',
        () => {
            scrollSpecialistCardToView(
                specialistCarouselIndex + 1
            );
        }
    );

    teamGrid.addEventListener(
        'scroll',
        throttle(
            updateSpecialistCarouselFromPosition,
            80
        ),
        {
            passive: true
        }
    );

    window.addEventListener(
        'resize',
        debounce(() => {
            if (isMobileViewport()) {
                updateSpecialistCarouselFromPosition();
            }
        }, 140)
    );

    if (
        'IntersectionObserver' in window
    ) {
        const observer =
            new IntersectionObserver(
                (entries) => {
                    if (
                        !isMobileViewport()
                    ) {
                        return;
                    }

                    const mostVisibleEntry =
                        entries
                            .filter(
                                (entry) =>
                                    entry.isIntersecting
                            )
                            .sort(
                                (
                                    firstEntry,
                                    secondEntry
                                ) =>
                                    secondEntry.intersectionRatio -
                                    firstEntry.intersectionRatio
                            )[0];

                    if (!mostVisibleEntry) {
                        return;
                    }

                    const index =
                        specialistCardsList.indexOf(
                            mostVisibleEntry.target
                        );

                    if (index !== -1) {
                        updateSpecialistCarouselState(
                            index
                        );
                    }
                },
                {
                    root: teamGrid,
                    threshold: [
                        0.55,
                        0.7,
                        0.85
                    ]
                }
            );

        specialistCardsList.forEach(
            (card) =>
                observer.observe(card)
        );
    }
}

function updateSpecialistCarouselFromPosition() {
    const teamGrid = qs('.team-grid');

    if (
        !teamGrid ||
        !isMobileViewport() ||
        !specialistCardsList.length
    ) {
        return;
    }

    const gridRect =
        teamGrid.getBoundingClientRect();

    const gridCenter =
        gridRect.left +
        gridRect.width / 2;

    let nearestIndex = 0;
    let nearestDistance =
        Number.POSITIVE_INFINITY;

    specialistCardsList.forEach(
        (card, index) => {
            const cardRect =
                card.getBoundingClientRect();

            const cardCenter =
                cardRect.left +
                cardRect.width / 2;

            const distance =
                Math.abs(
                    cardCenter -
                    gridCenter
                );

            if (
                distance <
                nearestDistance
            ) {
                nearestDistance =
                    distance;

                nearestIndex = index;
            }
        }
    );

    updateSpecialistCarouselState(
        nearestIndex
    );
}

function scrollSpecialistCardToView(index) {
    if (
        index < 0 ||
        index >= specialistCardsList.length
    ) {
        return;
    }

    const targetCard =
        specialistCardsList[index];

    targetCard.scrollIntoView({
        behavior: prefersReducedMotion()
            ? 'auto'
            : 'smooth',
        block: 'nearest',
        inline: 'center'
    });

    updateSpecialistCarouselState(
        index
    );
}

function updateSpecialistCarouselState(index) {
    const total =
        specialistCardsList.length;

    if (!total) {
        return;
    }

    const safeIndex = Math.min(
        Math.max(index, 0),
        total - 1
    );

    const prevBtn = qs(
        '#teamCarouselPrev'
    );

    const nextBtn = qs(
        '#teamCarouselNext'
    );

    const indicator = qs(
        '#teamCarouselIndicator'
    );

    specialistCarouselIndex =
        safeIndex;

    if (indicator) {
        indicator.textContent =
            `${safeIndex + 1} / ${total}`;

        indicator.setAttribute(
            'aria-label',
            `عضو الفريق ${safeIndex + 1} من ${total}`
        );
    }

    if (prevBtn) {
        const isDisabled =
            safeIndex === 0;

        prevBtn.disabled =
            isDisabled;

        prevBtn.setAttribute(
            'aria-disabled',
            String(isDisabled)
        );
    }

    if (nextBtn) {
        const isDisabled =
            safeIndex === total - 1;

        nextBtn.disabled =
            isDisabled;

        nextBtn.setAttribute(
            'aria-disabled',
            String(isDisabled)
        );
    }
}

function populateSpecialistModalAvatar(
    card,
    name
) {
    const modalImg = qs(
        '#specialistModalImg'
    );

    const modalFallback = qs(
        '#specialistModalFallback'
    );

    const modalInitials = qs(
        '#specialistModalInitials'
    );

    const avatar = qs(
        '[data-specialist-avatar]',
        card
    );

    const avatarImage = qs(
        '[data-specialist-image]',
        card
    );

    const avatarType =
        avatar?.dataset
            .specialistAvatarType ||
        'fallback';

    const initials =
        getSpecialistInitials(
            card,
            name
        );

    const showFallback = () => {
        if (modalImg) {
            modalImg.hidden = true;
            modalImg.removeAttribute(
                'src'
            );
            modalImg.alt = '';
            modalImg.onerror = null;
        }

        if (modalFallback) {
            modalFallback.hidden =
                false;

            modalFallback.setAttribute(
                'aria-label',
                `صورة بديلة لـ${name}`
            );
        }

        if (modalInitials) {
            modalInitials.textContent =
                initials;
        }
    };

    if (
        avatarType !== 'image' ||
        !avatarImage ||
        !modalImg
    ) {
        showFallback();
        return;
    }

    if (modalFallback) {
        modalFallback.hidden =
            true;

        modalFallback.setAttribute(
            'aria-label',
            ''
        );
    }

    modalImg.hidden = false;

    modalImg.alt =
        avatarImage.alt ||
        `صورة ${name}`;

    modalImg.onerror =
        showFallback;

    modalImg.src =
        avatarImage.currentSrc ||
        avatarImage.src;
}

function openSpecialistSheet(
    card,
    triggerButton
) {
    const overlay = qs(
        '#specialistModalOverlay'
    );

    const modalName = qs(
        '#specialistModalName'
    );

    const modalRole = qs(
        '#specialistModalRole'
    );

    const modalDetails = qs(
        '#specialistModalDetails'
    );

    const closeBtn = qs(
        '#specialistSheetCloseBtn'
    );

    const nameElement = qs(
        '.team-name',
        card
    );

    const roleElement = qs(
        '.team-role',
        card
    );

    const detailsList = qs(
        '.team-details-list',
        card
    );

    if (
        !overlay ||
        !card ||
        !nameElement
    ) {
        return;
    }

    const name =
        nameElement.textContent.trim();

    const role =
        roleElement?.textContent.trim() ||
        '';

    activeSpecialistTriggerBtn =
        triggerButton || null;

    if (modalName) {
        modalName.textContent = name;
    }

    if (modalRole) {
        modalRole.textContent = role;
    }

    if (modalDetails) {
        modalDetails.replaceChildren();

        if (detailsList) {
            Array.from(
                detailsList.children
            ).forEach((detailItem) => {
                modalDetails.append(
                    detailItem.cloneNode(
                        true
                    )
                );
            });
        }
    }

    populateSpecialistModalAvatar(
        card,
        name
    );

    previousBodyOverflow =
        document.body.style.overflow;

    document.body.style.overflow =
        'hidden';

    overlay.setAttribute(
        'aria-hidden',
        'false'
    );

    overlay.classList.add(
        'is-open'
    );

    window.setTimeout(
        () => closeBtn?.focus(),
        50
    );
}

function attachSpecialistModalListeners() {
    const overlay = qs(
        '#specialistModalOverlay'
    );

    const closeBtn = qs(
        '#specialistSheetCloseBtn'
    );

    const backdrop = qs(
        '#specialistModalBackdrop'
    );

    if (
        !overlay ||
        overlay.dataset
            .listenersAttached === 'true'
    ) {
        return;
    }

    overlay.dataset.listenersAttached =
        'true';

    closeBtn?.addEventListener(
        'click',
        closeSpecialistSheet
    );

    backdrop?.addEventListener(
        'click',
        closeSpecialistSheet
    );

    overlay.addEventListener(
        'keydown',
        (event) => {
            if (event.key !== 'Tab') {
                return;
            }

            const focusableElements = qsa(
                [
                    'button:not([disabled])',
                    '[href]',
                    'input:not([disabled])',
                    'select:not([disabled])',
                    'textarea:not([disabled])',
                    '[tabindex]:not([tabindex="-1"])'
                ].join(','),
                overlay
            ).filter(
                (element) =>
                    !element.hidden &&
                    element.offsetParent !==
                        null
            );

            if (
                !focusableElements.length
            ) {
                return;
            }

            const firstElement =
                focusableElements[0];

            const lastElement =
                focusableElements[
                    focusableElements.length -
                        1
                ];

            if (
                event.shiftKey &&
                document.activeElement ===
                    firstElement
            ) {
                lastElement.focus();
                event.preventDefault();
            } else if (
                !event.shiftKey &&
                document.activeElement ===
                    lastElement
            ) {
                firstElement.focus();
                event.preventDefault();
            }
        }
    );
}

function closeSpecialistSheet({
    returnFocus = true
} = {}) {
    const overlay = qs(
        '#specialistModalOverlay'
    );

    if (
        !overlay ||
        overlay.getAttribute(
            'aria-hidden'
        ) === 'true'
    ) {
        return;
    }

    overlay.classList.remove(
        'is-open'
    );

    overlay.setAttribute(
        'aria-hidden',
        'true'
    );

    document.body.style.overflow =
        previousBodyOverflow;

    if (
        returnFocus &&
        activeSpecialistTriggerBtn
            ?.isConnected
    ) {
        activeSpecialistTriggerBtn
            .focus();
    }

    activeSpecialistTriggerBtn =
        null;
}

/* =========================================================
   06b. Testimonials Carousel
========================================================= */

let testimonialsCarouselIndex = 0;
let testimonialsCardsList = [];

function initTestimonialsCarousel() {
    const track =
        qs('[data-testimonials-track]') ||
        qs('.testimonials-grid');

    const container =
        qs('#testimonials');

    if (!track || !container) {
        return;
    }

    testimonialsCardsList = qsa(
        '[data-testimonial-card]',
        track
    );

    if (
        !testimonialsCardsList.length
    ) {
        testimonialsCardsList = qsa(
            '.testimonial-card',
            track
        );
    }

    if (
        !testimonialsCardsList.length
    ) {
        return;
    }

    const prevBtn = qs(
        '[data-testimonials-prev]',
        container
    );

    const nextBtn = qs(
        '[data-testimonials-next]',
        container
    );

    updateTestimonialsCarouselState(0);

    if (prevBtn) {
        prevBtn.addEventListener(
            'click',
            () => {
                if (
                    testimonialsCarouselIndex >
                    0
                ) {
                    scrollToTestimonial(
                        testimonialsCarouselIndex -
                            1
                    );
                }
            }
        );
    }

    if (nextBtn) {
        nextBtn.addEventListener(
            'click',
            () => {
                if (
                    testimonialsCarouselIndex <
                    testimonialsCardsList.length -
                        1
                ) {
                    scrollToTestimonial(
                        testimonialsCarouselIndex +
                            1
                    );
                }
            }
        );
    }

    if (
        'IntersectionObserver' in window
    ) {
        const observer =
            new IntersectionObserver(
                (entries) => {
                    if (
                        !isMobileViewport()
                    ) {
                        return;
                    }

                    entries.forEach(
                        (entry) => {
                            if (
                                entry.isIntersecting
                            ) {
                                const index =
                                    testimonialsCardsList.indexOf(
                                        entry.target
                                    );

                                if (
                                    index !==
                                    -1
                                ) {
                                    updateTestimonialsCarouselState(
                                        index
                                    );
                                }
                            }
                        }
                    );
                },
                {
                    root: track,
                    threshold: 0.55
                }
            );

        testimonialsCardsList.forEach(
            (card) =>
                observer.observe(card)
        );
    } else {
        const handleScroll =
            throttle(() => {
                if (
                    !isMobileViewport()
                ) {
                    return;
                }

                const currentIndex =
                    getActiveTestimonialIndex();

                if (
                    currentIndex !==
                    testimonialsCarouselIndex
                ) {
                    updateTestimonialsCarouselState(
                        currentIndex
                    );
                }
            }, 100);

        track.addEventListener(
            'scroll',
            handleScroll,
            {
                passive: true
            }
        );
    }

    const desktopQuery =
        window.matchMedia(
            '(min-width: 768px)'
        );

    const handleViewportChange = (
        event
    ) => {
        if (!event.matches) {
            updateTestimonialsCarouselState(
                testimonialsCarouselIndex
            );
        }
    };

    if (
        typeof desktopQuery.addEventListener ===
        'function'
    ) {
        desktopQuery.addEventListener(
            'change',
            handleViewportChange
        );
    } else {
        desktopQuery.addListener(
            handleViewportChange
        );
    }
}

function scrollToTestimonial(index) {
    if (
        !testimonialsCardsList ||
        index < 0 ||
        index >=
            testimonialsCardsList.length
    ) {
        return;
    }

    const targetCard =
        testimonialsCardsList[index];

    if (targetCard) {
        targetCard.scrollIntoView({
            behavior:
                prefersReducedMotion()
                    ? 'auto'
                    : 'smooth',
            block: 'nearest',
            inline: 'center'
        });

        updateTestimonialsCarouselState(
            index
        );
    }
}

function getActiveTestimonialIndex() {
    const track =
        qs('[data-testimonials-track]') ||
        qs('.testimonials-grid');

    if (
        !track ||
        !testimonialsCardsList.length
    ) {
        return 0;
    }

    const trackRect =
        track.getBoundingClientRect();

    const trackCenter =
        trackRect.left +
        trackRect.width / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    testimonialsCardsList.forEach(
        (card, index) => {
            const cardRect =
                card.getBoundingClientRect();

            const cardCenter =
                cardRect.left +
                cardRect.width / 2;

            const distance =
                Math.abs(
                    trackCenter -
                    cardCenter
                );

            if (distance < minDistance) {
                minDistance = distance;
                closestIndex = index;
            }
        }
    );

    return closestIndex;
}

function updateTestimonialsCarouselState(
    index
) {
    if (
        !testimonialsCardsList.length
    ) {
        return;
    }

    testimonialsCarouselIndex =
        Math.max(
            0,
            Math.min(
                index,
                testimonialsCardsList.length -
                    1
            )
        );

    const container =
        qs('#testimonials');

    const prevBtn = qs(
        '[data-testimonials-prev]',
        container
    );

    const nextBtn = qs(
        '[data-testimonials-next]',
        container
    );

    const indicator = qs(
        '[data-testimonials-indicator]',
        container
    );

    const total =
        testimonialsCardsList.length;

    if (indicator) {
        indicator.textContent =
            `${testimonialsCarouselIndex + 1} / ${total}`;
    }

    if (prevBtn) {
        const isDisabled =
            testimonialsCarouselIndex <= 0;

        prevBtn.disabled =
            isDisabled;

        prevBtn.setAttribute(
            'aria-disabled',
            String(isDisabled)
        );
    }

    if (nextBtn) {
        const isDisabled =
            testimonialsCarouselIndex >=
            total - 1;

        nextBtn.disabled =
            isDisabled;

        nextBtn.setAttribute(
            'aria-disabled',
            String(isDisabled)
        );
    }
}

/* =========================================================
   07. WhatsApp Branch Booking
========================================================= */

function buildBookingMessage(
    branchName
) {
    const messageLines = [
        'مرحباً، أريد حجز موعد في العيادة.',
        '',
        `الفرع: ${branchName}`,
        '',
        'يرجى إرسال أقرب موعد متاح، شكراً.'
    ];

    return messageLines.join('\n');
}

function initWhatsAppBooking() {
    qsa(
        '[data-booking-button]'
    ).forEach((button) => {
        button.addEventListener(
            'click',
            () => {
                const branchName =
                    String(
                        button.dataset
                            .branch || ''
                    ).trim();

                const phoneNumber =
                    String(
                        button.dataset
                            .phone || ''
                    ).replace(/\D/g, '');

                if (
                    !branchName ||
                    !phoneNumber
                ) {
                    console.error(
                        'بيانات فرع الحجز غير مكتملة.',
                        {
                            branchName,
                            phoneNumber
                        }
                    );

                    return;
                }

                const message =
                    buildBookingMessage(
                        branchName
                    );

                const whatsappUrl =
                    `https://wa.me/${phoneNumber}` +
                    `?text=${encodeURIComponent(
                        message
                    )}`;

                openSecureWindow(
                    whatsappUrl
                );
            }
        );
    });
}

/* =========================================================
   09. Contact Form to WhatsApp
========================================================= */

function validatePhoneNumber(
    phoneNumber
) {
    return /^[0-9+\-\s()]{7,20}$/.test(
        String(
            phoneNumber || ''
        ).trim()
    );
}

function initContactForm() {
    const contactForm =
        qs('#contactForm');

    if (!contactForm) {
        return;
    }

    contactForm.addEventListener(
        'submit',
        (event) => {
            event.preventDefault();

            const nameInput = qs(
                '#name',
                contactForm
            );

            const phoneInput = qs(
                '#phone',
                contactForm
            );

            const messageInput = qs(
                '#message',
                contactForm
            );

            const name =
                nameInput?.value.trim() ||
                '';

            const phone =
                phoneInput?.value.trim() ||
                '';

            const message =
                messageInput?.value.trim() ||
                '';

            if (
                !name ||
                !phone ||
                !message
            ) {
                window.alert(
                    'يرجى ملء جميع الحقول قبل الإرسال.'
                );

                return;
            }

            if (
                !validatePhoneNumber(
                    phone
                )
            ) {
                window.alert(
                    'يرجى إدخال رقم هاتف صحيح.'
                );

                phoneInput?.focus();
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

            const defaultPhone =
                '972526020026';

            const whatsappUrl =
                `https://wa.me/${defaultPhone}` +
                `?text=${encodeURIComponent(
                    whatsappMessage
                )}`;

            openSecureWindow(
                whatsappUrl
            );

            contactForm.reset();

            qsa(
                '.form-group',
                contactForm
            ).forEach((group) => {
                group.classList.remove(
                    'focused',
                    'has-value'
                );
            });
        }
    );
}

/* =========================================================
   10. Form Field States
========================================================= */

function initFormFieldStates() {
    qsa(
        '.form-group input, .form-group textarea'
    ).forEach((input) => {
        const group =
            input.closest(
                '.form-group'
            );

        if (!group) {
            return;
        }

        const updateValueState =
            () => {
                group.classList.toggle(
                    'has-value',
                    Boolean(
                        input.value.trim()
                    )
                );
            };

        input.addEventListener(
            'focus',
            () => {
                group.classList.add(
                    'focused'
                );
            }
        );

        input.addEventListener(
            'blur',
            () => {
                group.classList.remove(
                    'focused'
                );

                updateValueState();
            }
        );

        input.addEventListener(
            'input',
            updateValueState
        );

        updateValueState();
    });
}

/* =========================================================
   11. Scroll Reveal
========================================================= */

function initScrollReveal() {
    const revealItems = qsa(
        [
            '.section-heading',
            '.service-card',
            '.treatment-card',
            '.team-card',
            '.feature-card',
            '.booking-card',
            '.testimonial-card',
            '.contact-item',
            '.contact-form'
        ].join(',')
    );

    if (!revealItems.length) {
        return;
    }

    if (
        !(
            'IntersectionObserver' in
            window
        ) ||
        prefersReducedMotion()
    ) {
        revealItems.forEach(
            (item) => {
                item.classList.add(
                    'fade-in'
                );
            }
        );

        return;
    }

    revealItems.forEach((item) => {
        item.style.opacity = '0';

        item.style.transform =
            'translateY(28px)';
    });

    const observer =
        new IntersectionObserver(
            (
                entries,
                revealObserver
            ) => {
                entries.forEach(
                    (entry) => {
                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }

                        const item =
                            entry.target;

                        item.classList.add(
                            'fade-in'
                        );

                        item.style.opacity =
                            '';

                        item.style.transform =
                            '';

                        revealObserver.unobserve(
                            item
                        );
                    }
                );
            },
            {
                threshold: 0.12,
                rootMargin:
                    '0px 0px -70px 0px'
            }
        );

    revealItems.forEach(
        (item, index) => {
            item.style.transitionDelay =
                `${
                    Math.min(
                        index % 6,
                        5
                    ) * 45
                }ms`;

            observer.observe(item);
        }
    );
}

/* =========================================================
   12. Pointer and Keyboard Feedback
========================================================= */

function initInteractionFeedback() {
    const interactiveElements =
        qsa(
            [
                '.btn',
                '.whatsapp-btn',
                '.social-link',
                '.floating-cta-btn',
                '.team-expand-btn'
            ].join(',')
        );

    interactiveElements.forEach(
        (element) => {
            const removePressedState =
                () => {
                    element.classList.remove(
                        'is-pressed'
                    );
                };

            element.addEventListener(
                'pointerdown',
                () => {
                    element.classList.add(
                        'is-pressed'
                    );
                }
            );

            element.addEventListener(
                'pointerup',
                removePressedState
            );

            element.addEventListener(
                'pointerleave',
                removePressedState
            );

            element.addEventListener(
                'pointercancel',
                removePressedState
            );

            element.addEventListener(
                'keyup',
                (event) => {
                    if (
                        event.key !==
                            'Enter' &&
                        event.key !== ' '
                    ) {
                        return;
                    }

                    element.classList.add(
                        'keyboard-active'
                    );

                    window.setTimeout(
                        () => {
                            element.classList.remove(
                                'keyboard-active'
                            );
                        },
                        180
                    );
                }
            );
        }
    );
}

/* =========================================================
   13. Floating Mobile Booking CTA
========================================================= */

function initFloatingCTA() {
    const floatingCta =
        qs('.floating-cta');

    const floatingButton =
        floatingCta
            ? qs(
                  '.floating-cta-btn',
                  floatingCta
              )
            : null;

    const bookingSection =
        qs('#booking');

    const footer =
        qs('.footer');

    if (
        !floatingCta ||
        !floatingButton
    ) {
        return;
    }

    const updateFloatingCTA =
        () => {
            const isDesktop =
                window.matchMedia(
                    '(min-width: 768px)'
                ).matches;

            if (isDesktop) {
                floatingCta.style.display =
                    'none';

                return;
            }

            floatingCta.style.display =
                '';

            const bookingRect =
                bookingSection
                    ?.getBoundingClientRect();

            const footerRect =
                footer
                    ?.getBoundingClientRect();

            const bookingIsVisible =
                Boolean(
                    bookingRect &&
                        bookingRect.top <
                            window.innerHeight *
                                0.78 &&
                        bookingRect.bottom >
                            window.innerHeight *
                                0.18
                );

            const footerIsVisible =
                Boolean(
                    footerRect &&
                        footerRect.top <
                            window.innerHeight -
                                72
                );

            const shouldHide =
                bookingIsVisible ||
                footerIsVisible;

            floatingCta.style.opacity =
                shouldHide
                    ? '0'
                    : '1';

            floatingCta.style.transform =
                shouldHide
                    ? 'translateY(20px)'
                    : 'translateY(0)';

            floatingCta.style.pointerEvents =
                shouldHide
                    ? 'none'
                    : 'auto';

            floatingButton.setAttribute(
                'aria-hidden',
                String(shouldHide)
            );

            floatingButton.tabIndex =
                shouldHide
                    ? -1
                    : 0;
        };

    updateFloatingCTA();

    window.addEventListener(
        'scroll',
        throttle(
            updateFloatingCTA,
            120
        ),
        {
            passive: true
        }
    );

    window.addEventListener(
        'resize',
        debounce(
            updateFloatingCTA,
            160
        )
    );
}

/* =========================================================
   14. Image Loading Enhancements
========================================================= */

function initImages() {
    const fallbackImages = [
        'assets/images/hero/hero.jpeg',
        'assets/images/hero/hero-2.jpg',
        'assets/images/hero/hero-3.jpg',
        'assets/images/services/medical-massage.jpg',
        'assets/images/services/dry-cupping.jpg'
    ];

    qsa('img').forEach(
        (image, index) => {
            if (
                !image.hasAttribute(
                    'loading'
                ) &&
                !image.hasAttribute(
                    'fetchpriority'
                )
            ) {
                image.loading =
                    'lazy';
            }

            const markAsLoaded =
                () => {
                    image.classList.add(
                        'is-loaded'
                    );
                };

            if (
                image.complete &&
                image.naturalWidth > 0
            ) {
                markAsLoaded();
            } else {
                image.addEventListener(
                    'load',
                    markAsLoaded,
                    {
                        once: true
                    }
                );
            }

            /*
             * Specialist images have their
             * own named fallback-avatar
             * handling.
             *
             * Never replace a missing team
             * photo with an unrelated clinic
             * image.
             */
            if (
                image.matches(
                    '[data-specialist-image], #specialistModalImg'
                )
            ) {
                return;
            }

            image.addEventListener(
                'error',
                () => {
                    if (
                        image.dataset
                            .fallbackApplied ===
                        'true'
                    ) {
                        return;
                    }

                    image.dataset
                        .fallbackApplied =
                        'true';

                    image.src =
                        fallbackImages[
                            index %
                                fallbackImages.length
                        ];
                }
            );
        }
    );
}

/* =========================================================
   15. External Link Security
========================================================= */

function secureExternalLinks() {
    qsa(
        'a[target="_blank"]'
    ).forEach((link) => {
        const relValues =
            new Set(
                (
                    link.getAttribute(
                        'rel'
                    ) || ''
                )
                    .split(/\s+/)
                    .filter(Boolean)
            );

        relValues.add(
            'noopener'
        );

        relValues.add(
            'noreferrer'
        );

        link.setAttribute(
            'rel',
            Array.from(
                relValues
            ).join(' ')
        );
    });
}

/* =========================================================
   16. Footer Year
========================================================= */

function updateFooterYear() {
    const footerText =
        qs('.footer-bottom p');

    if (!footerText) {
        return;
    }

    footerText.innerHTML =
        `&copy; ${new Date().getFullYear()} ` +
        'العيادة. جميع الحقوق محفوظة.';
}

/* =========================================================
   17. Optional Desktop Tilt
   Specialist and booking cards are intentionally excluded.
========================================================= */

function initDesktopCardTilt() {
    if (prefersReducedMotion()) {
        return;
    }

    if (
        !window.matchMedia(
            '(hover: hover) and (pointer: fine)'
        ).matches
    ) {
        return;
    }

    qsa(
        [
            '.service-card',
            '.treatment-card',
            '.feature-card'
        ].join(',')
    ).forEach((card) => {
        card.addEventListener(
            'mousemove',
            (event) => {
                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;

                const rotateY =
                    (
                        x / rect.width -
                        0.5
                    ) * -4;

                const rotateX =
                    (
                        y / rect.height -
                        0.5
                    ) * 4;

                card.style.transform =
                    `translateY(-5px) ` +
                    `rotateX(${rotateX}deg) ` +
                    `rotateY(${rotateY}deg)`;
            }
        );

        card.addEventListener(
            'mouseleave',
            () => {
                card.style.transform =
                    '';
            }
        );
    });
}

/* =========================================================
   18. Initialization
========================================================= */

function initializeWebsite() {
    initMobileNavigation();
    initSmoothScroll();
    initHeaderScrollState();
    initActiveNavigation();
    initSpecialistExperience();
    initTestimonialsCarousel();
    initWhatsAppBooking();
    initContactForm();
    initFormFieldStates();
    initScrollReveal();
    initInteractionFeedback();
    initFloatingCTA();
    initImages();
    secureExternalLinks();
    updateFooterYear();
    initDesktopCardTilt();
}

if (
    document.readyState ===
    'loading'
) {
    document.addEventListener(
        'DOMContentLoaded',
        initializeWebsite,
        {
            once: true
        }
    );
} else {
    initializeWebsite();
}

window.addEventListener(
    'load',
    () => {
        document.body.classList.add(
            'page-loaded'
        );
    }
);