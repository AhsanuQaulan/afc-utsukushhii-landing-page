document.addEventListener('DOMContentLoaded', () => {
    // 1. DYNAMIC HERO LOGIC
    const urlParams = new URLSearchParams(window.location.search);
    const angle = urlParams.get('angle');

    const heroData = {
        '1': {
            headline: "Aku mulai sadar...",
            subheadline: "Wajah sekarang berubah pelan-pelan. Dulu begadang sedikit masih kelihatan segar. Sekarang? Tidur cukup pun kadang wajah tetap terlihat lelah.",
            cta: "Pelajari Utsukushhii",
            image: "image/angle_1.png"
        },
        '2': {
            headline: "Gak semua perubahan wajah datang karena usia.",
            subheadline: "Kadang tubuh cuma sedang memberi sinyal kalau ia butuh perhatian lebih. Dulu bangun tidur muka langsung fresh. Sekarang rasanya butuh usaha lebih.",
            cta: "Pelajari Utsukushhii",
            image: "image/angle_2.png"
        },
        '3': {
            headline: "Sibuk ngurus semuanya...",
            subheadline: "Sampai lupa rawat diri sendiri. Padahal merasa cantik, sehat, dan percaya diri bukanlah kemewahan. Itu kebutuhan.",
            cta: "Pelajari Utsukushhii",
            image: "image/angle_3.png"
        }
    };

    const headlineEl = document.getElementById('dynamic-headline');
    const subheadlineEl = document.getElementById('dynamic-subheadline');
    const ctaEl = document.getElementById('dynamic-cta');
    const imgEl = document.getElementById('dynamic-hero-img');

    // Apply dynamic content ONLY if angle parameter exists in URL
    if (angle && heroData[angle]) {
        const currentData = heroData[angle];
        if (headlineEl) headlineEl.textContent = currentData.headline;
        if (subheadlineEl) subheadlineEl.textContent = currentData.subheadline;
        if (ctaEl) ctaEl.textContent = currentData.cta;
        if (imgEl) imgEl.src = currentData.image;
    }
    
    // Mark hero as ready to show (prevents flicker)
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) heroContent.classList.add('is-ready');


    // 2. STICKY CTA VISIBILITY
    const stickyCta = document.getElementById('sticky-cta');
    const heroSection = document.getElementById('hero');

    window.addEventListener('scroll', () => {
        if (window.scrollY > heroSection.offsetHeight) {
            stickyCta.classList.add('visible');
        } else {
            stickyCta.classList.remove('visible');
        }
    });


    // 3. FAQ ACCORDION
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isOpen = item.classList.contains('is-open');
            
            // Close all items (but don't touch 'active' class used for reveal)
            document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('is-open'));
            
            // Toggle current item
            if (!isOpen) {
                item.classList.add('is-open');
            }
        });
    });


    // 4. SMOOTH SCROLLING
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. SCROLL REVEAL ANIMATION
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(el => revealObserver.observe(el));
});

// 6. META ADS TRACKING (PIXEL & CAPI)
const META_PIXEL_ID = '958885573763756';
const META_CAPI_TOKEN = 'EAAUYpbrmJJsBRCYLdPwKk6w3r1tTyOfqAEpbP1HxEB8BeJqzzWfZBgcZCGyHbxfUPbSBu6zVXo7IiQfyBIMXUOZAWUoOTV4D7Amce2h613qS7nr4QHg52jlHTxkyTb6gdALDo09UxPmiZAF5aSWDlL7WRv03ZBWIiWg9355Y4CgLLmHirp0qGqn7YHET0LgZDZD';

// Track Contact/Lead when WhatsApp buttons are clicked
document.addEventListener('click', (e) => {
    const waLink = e.target.closest('a[href*="wa.me"]');
    if (waLink) {
        // Browser Pixel Tracking
        if (typeof fbq === 'function') {
            fbq('track', 'Contact');
            fbq('track', 'Lead');
        }
        
        // Note: CAPI Tracking usually requires a server-side implementation 
        // to securely use the token and avoid CORS issues.
    }
});
