 document.addEventListener('DOMContentLoaded', function() {
            // API Configuration from config.js
            const API_URL = typeof CONFIG !== 'undefined' ? CONFIG.API_URL : 'http://localhost:3000/api';

            // Translation object for success messages
            const translations = {
                'EN': {
                    success: 'We will get back to you within 24 hours',
                    error: 'Something went wrong. Please try again.',
                    emailRequired: 'Please enter a valid email address.'
                },
                'DE': {
                    success: 'Wir werden uns innerhalb von 24 Stunden bei Ihnen melden',
                    error: 'Etwas ist schief gelaufen. Bitte versuchen Sie es erneut.',
                    emailRequired: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.'
                },
                'IT': {
                    success: 'Ti risponderemo entro 24 ore',
                    error: 'Qualcosa è andato storto. Per favore riprova.',
                    emailRequired: 'Inserisci un indirizzo email valido.'
                },
                'FR': {
                    success: 'Nous vous répondrons dans les 24 heures',
                    error: 'Quelque chose s\'est mal passé. Veuillez réessayer.',
                    emailRequired: 'Veuillez entrer une adresse e-mail valide.'
                },
                'RS': {
                    success: 'Мы свяжемся с вами в течение 24 часов',
                    error: 'Что-то пошло не так. Пожалуйста, попробуйте снова.',
                    emailRequired: 'Пожалуйста, введите действительный адрес электронной почты.'
                },
                'AR': {
                    success: 'سنتواصل معك خلال 24 ساعة',
                    error: 'حدث خطأ ما. يرجى المحاولة مرة أخرى.',
                    emailRequired: 'يرجى إدخال عنوان بريد إلكتروني صالح.'
                }
            };

            // Get current language
            function getCurrentLanguage() {
                return localStorage.getItem('selectedLanguage') || 'EN';
            }

            // Show success message with checkmark
            function showSuccessMessage(message) {
                const overlay = document.createElement('div');
                overlay.className = 'success-overlay';
                overlay.innerHTML = `
                    <div class="success-message">
                        <div class="success-checkmark">
                            <svg viewBox="0 0 52 52">
                                <circle class="success-checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                                <path class="success-checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                            </svg>
                        </div>
                        <p class="success-text">${message}</p>
                    </div>
                `;
                document.body.appendChild(overlay);

                setTimeout(() => {
                    overlay.classList.add('active');
                }, 10);

                setTimeout(() => {
                    overlay.classList.remove('active');
                    setTimeout(() => overlay.remove(), 300);
                }, 3000);
            }

            // Cache DOM elements
            const DOM = {
                dropdownItems: document.querySelectorAll('.dropdown-item'),
                languageText: document.querySelector('.language-text'),
                header: document.querySelector('.header'),
                heroTitle: document.querySelector('.hero-title'),
                reserveBtn: document.getElementById('reserveBtn'),
                reserveBtn2: document.getElementById('reserveBtn2'),
                bookingReserveBtn: document.getElementById('bookingReserveBtn'),
                brochureBtn: document.getElementById('brochureBtn'),
                brochureBtn2: document.getElementById('brochureBtn2'),
                newsletterBtn: document.getElementById('newsletterBtn'),
                particleContainer: document.getElementById('particleContainer'),
                pulseCircle: document.getElementById('pulseCircle'),
                bookingOverlay: document.getElementById('bookingOverlay'),
                brochureSidebar: document.getElementById('brochureSidebar'),
                closeBtn: document.getElementById('closeBtn'),
                brochureClose: document.getElementById('brochureClose'),
                imageContainer: document.querySelector('.image-container'),
                imageSection: document.querySelector('.image-section')
            };

            DOM.navLinks = document.querySelectorAll('.nav-link');


            const state = {
                currentScrollPosition: 0,
                isAnimating: false
            };

            // Language detection and initialization
            const availableLanguages = {
                'rs': 'RS',
                'sr': 'RS', // Serbian alternative code
                'it': 'IT',
                'fr': 'FR',
                'de': 'DE',
                'ar': 'AR',
                'en': 'EN'
            };

            function detectAndSetLanguage() {
                // Check if language was already set by user
                const savedLang = localStorage.getItem('selectedLanguage');
                if (savedLang) {
                    // Apply saved language
                    if (DOM.languageText) {
                        DOM.languageText.textContent = savedLang;
                    }
                    return;
                }

                // Get browser language
                const userLang = navigator.language || navigator.userLanguage;
                const langCode = userLang.split('-')[0].toLowerCase(); // 'en-US' -> 'en'

                console.log('Detected browser language:', userLang, '-> Code:', langCode);

                // Check if we support this language
                const detectedLang = availableLanguages[langCode];

                if (detectedLang) {
                    setLanguage(detectedLang);
                    console.log('Language auto-set to:', detectedLang);
                } else {
                    setLanguage('EN'); // Default to English
                    console.log('Language defaulted to: EN (unsupported language:', langCode, ')');
                }
            }

            function setLanguage(lang) {
                // Update the language display text
                if (DOM.languageText) {
                    DOM.languageText.textContent = lang;
                }

                // Save to localStorage
                localStorage.setItem('selectedLanguage', lang);

                // Here you would typically load language-specific content
                // For example: loadLanguageContent(lang);
            }

            // Handle language dropdown clicks
            DOM.dropdownItems.forEach(item => {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    const selectedLang = this.textContent.trim();
                    setLanguage(selectedLang);
                    console.log('User manually selected language:', selectedLang);
                });
            });

            // Initialize language detection on first load
            detectAndSetLanguage();


let lastScrollY = 0;
let ticking = false;

function handleScroll() {
    const scrollY = window.scrollY;
    const header = DOM.header;
    
if (scrollY > 100) {
    header.classList.add('sticky');
    
    // Only hide if we're actually scrolling down AND we have a previous scroll position
    if (scrollY > lastScrollY && scrollY > 200 && lastScrollY > 0) {
        header.classList.add('hidden');
    } else {
        header.classList.remove('hidden');
    }
} else {
    header.classList.remove('sticky', 'hidden');
}

lastScrollY = scrollY;
    
    // Keep your existing hero fade and image animations
    DOM.heroTitle.classList.toggle('fade-out', scrollY > window.innerHeight * 0.4);
    
    if (DOM.imageSection) {
        const imageSectionTop = DOM.imageSection.offsetTop;
        if (scrollY >= imageSectionTop - window.innerHeight && scrollY <= imageSectionTop + window.innerHeight) {
            const progress = Math.min(Math.max((scrollY - (imageSectionTop - window.innerHeight)) / window.innerHeight, 0), 1);
            const width = 70 + (progress * 30);
            DOM.imageContainer.style.width = width + '%';
        }
    }
    
    updateScrollToTopButton();
    updateActiveNavLink();
}

            function updateActiveNavLink() {
    const sections = ['about', 'project', 'apartment', 'reserve', 'buy'];
    const scrollPosition = window.scrollY + 200;
    
    let activeSection = 'about';
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section && scrollPosition >= section.offsetTop) {
            activeSection = sectionId;
        }
    });
    
    DOM.navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${activeSection}`) {
            link.classList.add('active');
        }
    });

    // Add navigation click handlers after the existing event listeners
DOM.navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
}

            // Vacuum animation
            function createVacuumEffect() {
                if (state.isAnimating) return;
                state.isAnimating = true;
                state.currentScrollPosition = window.pageYOffset;
                
                const mainElements = [DOM.header, DOM.heroTitle, 
                    document.querySelector('.video-background'),
                    document.querySelector('.project-section'),
                    DOM.imageSection].filter(el => el);

                const particles = [];
                const centerX = window.innerWidth / 2;
                const centerY = window.innerHeight / 2;

                mainElements.forEach((el, index) => {
                    const rect = el.getBoundingClientRect();
                    if (rect.width > 0 && rect.height > 0) {
                        for (let i = 0; i < 3; i++) {
                            const particle = document.createElement('div');
                            particle.className = 'particle';
                            const size = 8;
                            const startX = rect.left + (rect.width * Math.random());
                            const startY = rect.top + (rect.height * Math.random());
                            
                            particle.style.cssText = `
                                width: ${size}px;
                                height: ${size}px;
                                left: ${startX}px;
                                top: ${startY}px;
                                position: fixed;
                                z-index: 9999;
                            `;
                            
                            DOM.particleContainer.appendChild(particle);
                            particles.push({
                                element: particle,
                                targetX: centerX - 4,
                                targetY: centerY - 4,
                                delay: index * 60 + i * 100
                            });
                        }
                        
                        setTimeout(() => {
                            el.style.transition = 'all 0.5s ease';
                            el.style.opacity = '0';
                            el.style.transform = 'scale(0.9)';
                        }, index * 60);
                    }
                });

                setTimeout(() => {
                    particles.forEach(particle => {
                        setTimeout(() => {
                            particle.element.style.left = `${particle.targetX}px`;
                            particle.element.style.top = `${particle.targetY}px`;
                            particle.element.style.transform = 'scale(0)';
                            particle.element.style.opacity = '0';
                        }, particle.delay);
                    });
                }, 100);

                setTimeout(() => {
                    DOM.pulseCircle.classList.add('active');
                    setTimeout(() => {
                        DOM.particleContainer.innerHTML = '';
                        DOM.pulseCircle.classList.remove('active');
                        DOM.bookingOverlay.classList.add('active');
                    }, 800);
                }, 1200);
            }

            function restoreWebsite() {
                state.isAnimating = true;
                DOM.bookingOverlay.classList.remove('active');
                
                setTimeout(() => {
                    DOM.pulseCircle.classList.add('active');
                    setTimeout(() => {
                        DOM.pulseCircle.classList.remove('active');
                        const mainElements = [DOM.header, DOM.heroTitle,
                            document.querySelector('.video-background'),
                            document.querySelector('.project-section'),
                            DOM.imageSection].filter(el => el);
                        
                        mainElements.forEach((el, index) => {
                            setTimeout(() => {
                                el.style.transition = 'all 0.4s ease';
                                el.style.opacity = '';
                                el.style.transform = '';
                            }, index * 40);
                        });
                        
                        setTimeout(() => {
                            window.scrollTo(0, state.currentScrollPosition);
                            state.isAnimating = false;
                        }, 300);
                    }, 600);
                }, 200);
            }

            function openBrochureSidebar() {
                DOM.brochureSidebar.classList.add('active');
            }

            function closeBrochureSidebar() {
                DOM.brochureSidebar.classList.remove('active');
            }

            // Event listeners
            window.addEventListener('scroll', handleScroll, {passive: true});
            
            // Reserve buttons
            DOM.reserveBtn?.addEventListener('click', createVacuumEffect);
            DOM.reserveBtn2?.addEventListener('click', createVacuumEffect);
            DOM.bookingReserveBtn?.addEventListener('click', createVacuumEffect);

            // Add to DOM object
DOM.mobileMenuToggle = document.getElementById('mobileMenuToggle');
DOM.mobileNavOverlay = document.getElementById('mobileNavOverlay');
DOM.mobileNavClose = document.getElementById('mobileNavClose');
DOM.mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
DOM.mobileReserveBtn = document.getElementById('mobileReserveBtn');

DOM.scrollToTopBtn = document.getElementById('scrollToTop');

// Add this function with your other functions
function updateScrollToTopButton() {
    const scrollY = window.scrollY;
    const showThreshold = window.innerHeight * 0.3; // Show after 30% scroll
    
    if (scrollY > showThreshold) {
        DOM.scrollToTopBtn.classList.add('visible');
    } else {
        DOM.scrollToTopBtn.classList.remove('visible');
    }
}


// Add these functions
function openMobileMenu() {
    DOM.mobileNavOverlay.classList.add('active');
    DOM.mobileMenuToggle.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    DOM.mobileNavOverlay.classList.remove('active');
    DOM.mobileMenuToggle.classList.remove('active');
    document.body.style.overflow = '';
}

// Add these event listeners
DOM.mobileMenuToggle?.addEventListener('click', openMobileMenu);
DOM.mobileNavClose?.addEventListener('click', closeMobileMenu);


            // Brochure buttons
            DOM.brochureBtn?.addEventListener('click', openBrochureSidebar);
            DOM.brochureBtn2?.addEventListener('click', openBrochureSidebar);

            // Close buttons
            DOM.closeBtn?.addEventListener('click', restoreWebsite);
            DOM.brochureClose?.addEventListener('click', closeBrochureSidebar);

            // Add this event listener with your other event listeners
DOM.scrollToTopBtn?.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

            // Newsletter button
            DOM.newsletterBtn?.addEventListener('click', async function(e) {
                e.preventDefault();
                const emailInput = document.querySelector('.newsletter-input');
                const email = emailInput.value;
                const lang = getCurrentLanguage();

                if (!email) {
                    alert(translations[lang].emailRequired);
                    return;
                }

                try {
                    const response = await fetch(`${API_URL}/newsletter`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email })
                    });

                    if (response.ok) {
                        showSuccessMessage(translations[lang].success);
                        emailInput.value = '';
                    } else {
                        alert(translations[lang].error);
                    }
                } catch (error) {
                    console.error('Newsletter error:', error);
                    alert(translations[lang].error);
                }
            });

            // Keyboard events
            document.addEventListener('keydown', e => {
                if (e.key === 'Escape') {
                    if (DOM.bookingOverlay.classList.contains('active')) {
                        restoreWebsite();
                    }
                    if (DOM.brochureSidebar.classList.contains('active')) {
                        closeBrochureSidebar();
                    }
                }
            });

            // Form submissions
            const reservationForm = document.querySelector('.reservation-form');
            if (reservationForm) {
                reservationForm.addEventListener('submit', async function(e) {
                    e.preventDefault();
                    const lang = getCurrentLanguage();
                    const formData = Object.fromEntries(new FormData(this));

                    try {
                        const response = await fetch(`${API_URL}/reservation`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(formData)
                        });

                        if (response.ok) {
                            showSuccessMessage(translations[lang].success);
                            this.reset();
                            setTimeout(() => restoreWebsite(), 1500);
                        } else {
                            alert(translations[lang].error);
                        }
                    } catch (error) {
                        console.error('Reservation error:', error);
                        alert(translations[lang].error);
                    }
                });
            }

            const brochureForm = document.querySelector('.brochure-form');
            if (brochureForm) {
                brochureForm.addEventListener('submit', async function(e) {
                    e.preventDefault();
                    const lang = getCurrentLanguage();
                    const formData = Object.fromEntries(new FormData(this));

                    try {
                        const response = await fetch(`${API_URL}/brochure`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(formData)
                        });

                        if (response.ok) {
                            showSuccessMessage(translations[lang].success);
                            this.reset();
                            setTimeout(() => closeBrochureSidebar(), 1500);
                        } else {
                            alert(translations[lang].error);
                        }
                    } catch (error) {
                        console.error('Brochure error:', error);
                        alert(translations[lang].error);
                    }
                });
            }

            const bidForm = document.querySelector('.bid-form');
            if (bidForm) {
                bidForm.addEventListener('submit', async function(e) {
                    e.preventDefault();
                    const lang = getCurrentLanguage();

                    // Extract name, email, and offer from the form inputs
                    const name = this.querySelector('input[type="text"]').value;
                    const email = this.querySelector('input[type="email"]').value;
                    const offer = this.querySelector('.bid-input').value;

                    try {
                        const response = await fetch(`${API_URL}/bid`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ name, email, offer })
                        });

                        if (response.ok) {
                            showSuccessMessage(translations[lang].success);
                            this.reset();
                        } else {
                            alert(translations[lang].error);
                        }
                    } catch (error) {
                        console.error('Bid error:', error);
                        alert(translations[lang].error);
                    }
                });
            }

            // Click outside to close
            DOM.bookingOverlay?.addEventListener('click', function(e) {
                if (e.target === this) restoreWebsite();
            });

            DOM.brochureSidebar?.addEventListener('click', function(e) {
                if (e.target === this) closeBrochureSidebar();
            });

            // Prevent form content clicks from closing
            document.querySelector('.booking-form')?.addEventListener('click', e => e.stopPropagation());
            document.querySelector('.brochure-content')?.addEventListener('click', e => e.stopPropagation());

            // Social links functionality
            document.querySelectorAll('.social-link').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const platform = this.querySelector('i').classList[1].split('-')[1];
                    alert(`This would open ${platform.charAt(0).toUpperCase() + platform.slice(1)} page`);
                });
            });

            // Legal links
            document.querySelectorAll('.legal-link').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const page = this.textContent.toLowerCase();
                    alert(`This would open the ${page} page`);
                });
            });


// Mobile nav links
DOM.mobileNavLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            closeMobileMenu();
        }
    });
});

// Mobile reserve button
DOM.mobileReserveBtn?.addEventListener('click', function() {
    closeMobileMenu();
    createVacuumEffect();
});

// Close mobile menu when clicking outside
DOM.mobileNavOverlay?.addEventListener('click', function(e) {
    if (e.target === this) closeMobileMenu();
});

// Close on escape key
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && DOM.mobileNavOverlay.classList.contains('active')) {
        closeMobileMenu();
    }

// Replace the existing Fancybox init with this:
// Initialize Fancybox - moved outside the keydown event listener
function initFancybox() {
    if (typeof Fancybox !== 'undefined') {
        Fancybox.bind("[data-fancybox='gallery']", {
            infinite: true,
            keyboard: {
                Escape: "close",
                Delete: "close",
                Backspace: "close",
                PageUp: "next",
                PageDown: "prev",
                ArrowRight: "next",
                ArrowLeft: "prev"
            },
            Thumbs: { showOnStart: false },
            Toolbar: {
                display: {
                    left: ["infobar"],
                    middle: [],
                    right: ["slideshow", "thumbs", "close"]
                }
            }
        });
    } else {
        console.error('Fancybox not loaded');
    }
}

// Call it after a small delay to ensure everything is loaded
setTimeout(initFancybox, 100);

});

            // Initialize
            handleScroll();
        });

        // Replace with this:
document.addEventListener('DOMContentLoaded', function() {
    if (typeof Fancybox !== 'undefined') {
        Fancybox.bind("[data-fancybox='gallery']", {
            infinite: true,
            Thumbs: { showOnStart: false }
        });
    }
});

        console.log('Script loaded');

window.addEventListener('load', function() {
    console.log('Window loaded');
    console.log('Fancybox type:', typeof Fancybox);
    
    // Force check gallery links
    const galleryLinks = document.querySelectorAll('[data-fancybox="gallery"]');
    console.log('Found gallery links:', galleryLinks.length);
    
    galleryLinks.forEach((link, index) => {
        console.log('Link ' + index + ':', link.href);
    });
});

// Also add immediate check
setTimeout(() => {
    console.log('Timeout check - Fancybox:', typeof Fancybox);
}, 2000);