document.addEventListener('DOMContentLoaded', () => {
    // === 1. FITUR DARK & LIGHT MODE ===
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    const savedTheme = localStorage.getItem('hsr_theme');
    if (savedTheme === 'light') {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        icon.classList.replace('fa-moon', 'fa-sun');
    } else {
        body.classList.add('dark-mode');
    }

    themeToggle.addEventListener('click', () => {
        const isDark = body.classList.contains('dark-mode');
        if (isDark) {
            body.classList.replace('dark-mode', 'light-mode');
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('hsr_theme', 'light');
        } else {
            body.classList.replace('light-mode', 'dark-mode');
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('hsr_theme', 'dark');
        }
    });

    // === 2. NAVBAR & BACK TO TOP VISIBILITY ===
    const navbar = document.querySelector('.navbar');
    const backToTop = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            navbar.style.padding = '0.8rem 5%';
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
            backToTop.classList.add('show');
        } else {
            navbar.style.padding = '1.2rem 5%';
            navbar.style.boxShadow = 'none';
            backToTop.classList.remove('show');
        }
    });

    // === 3. MOBILE MENU TOGGLE ===
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuIcon = mobileMenuBtn.querySelector('i');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        if (mobileMenu.classList.contains('active')) {
            mobileMenuIcon.classList.replace('fa-bars', 'fa-xmark');
        } else {
            mobileMenuIcon.classList.replace('fa-xmark', 'fa-bars');
        }
    });

    // Close mobile menu on link click
    document.querySelectorAll('.mobile-nav-item').forEach(item => {
        item.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileMenuIcon.classList.replace('fa-xmark', 'fa-bars');
        });
    });

    // === 4. ACTIVE NAV LINK HIGHLIGHT ON SCROLL ===
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links .nav-item');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // === 5. GENERATE STARS ===
    function generateStars() {
        const starsContainer = document.getElementById('stars-container');
        const fragment = document.createDocumentFragment();
        
        const isMobile = window.innerWidth < 600;
        const starCount = isMobile ? 40 : 80;

        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            
            star.style.left = `${Math.random() * 100}vw`;
            star.style.top = `${Math.random() * 100}vh`;
            
            const size = Math.random() * 2 + 1;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            
            star.style.animationDuration = `${Math.random() * 3 + 2}s`;
            star.style.animationDelay = `${Math.random() * 2}s`;
            
            fragment.appendChild(star);
        }
        starsContainer.appendChild(fragment);
    }
    generateStars();

    // === 6. ANIMASI MUNCUL SAAT DI-SCROLL (REVEAL) ===
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Jika elemen memiliki kelas progress (animasi bar loading)
                if (entry.target.classList.contains('skill-card')) {
                    const progress = entry.target.querySelector('.progress');
                    if (progress) {
                        const width = progress.style.width;
                        progress.style.width = '0';
                        setTimeout(() => {
                            progress.style.transition = 'width 1s cubic-bezier(0.1, 0.5, 0.1, 1)';
                            progress.style.width = width;
                        }, 300);
                    }
                }
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal, .reveal-up, .reveal-right, .skill-card, .project-card');
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // === 7. FORM SUBMIT SIMULATION ===
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Mengirim...';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.innerHTML = '<i class="fa-solid fa-check"></i> Pesan Terkirim!';
                btn.style.background = 'linear-gradient(45deg, #10b981, #059669)';
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    btn.style.background = '';
                }, 3000);
            }, 1500);
        });
    }
});
