// ===== ПЕРЕКЛЮЧЕНИЕ ТЕМЫ =====
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('themeToggle');
    if (toggle) {
        toggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const icon = toggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-moon');
                icon.classList.toggle('fa-sun');
            }
        });
    }
});

// ===== НАВИГАЦИЯ: ЭФФЕКТ ПРИ СКРОЛЛЕ =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    }
});

// ===== КНОПКА "НАВЕРХ" =====
window.addEventListener('scroll', () => {
    const btn = document.getElementById('scrollTop');
    if (btn) {
        btn.classList.toggle('visible', window.scrollY > 400);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('scrollTop');
    if (btn) {
        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});

// ===== КАРУСЕЛЬ =====
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.works-carousel');
    const cards = document.querySelectorAll('.work-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');

    if (!carousel || cards.length === 0) return;

    let currentIndex = 0;
    const totalCards = cards.length;
    let autoPlayInterval;

    function goToSlide(index) {
        if (index < 0) {
            currentIndex = totalCards - 1;
        } else if (index >= totalCards) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }

        const offset = currentIndex * 100;
        carousel.style.transform = `translateX(-${offset}%)`;

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    function startAutoPlay() {
        stopAutoPlay();
        autoPlayInterval = setInterval(nextSlide, 4000);
    }

    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            startAutoPlay();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            startAutoPlay();
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            startAutoPlay();
        });

        dot.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                goToSlide(index);
                startAutoPlay();
            }
        });
    });

    const wrapper = document.querySelector('.works-carousel-wrapper');
    if (wrapper) {
        wrapper.addEventListener('mouseenter', stopAutoPlay);
        wrapper.addEventListener('mouseleave', startAutoPlay);
    }

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const offset = currentIndex * 100;
            carousel.style.transform = `translateX(-${offset}%)`;
        }, 200);
    });

    setTimeout(() => {
        goToSlide(0);
        startAutoPlay();
    }, 400);
});

// ===== ПЛАВНЫЙ СКРОЛЛ =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();

        const target = document.querySelector(href);
        if (target) {
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ===== ФОРМА — С ВАЛИДАЦИЕЙ =====
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form[data-netlify="true"]');
    const successMsg = document.getElementById('form-success');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Валидация
            const name = document.getElementById('name');
            const phone = document.getElementById('phone');
            let isValid = true;

            // Проверяем имя
            if (!name.value.trim()) {
                name.style.borderBottomColor = '#e94560';
                isValid = false;
            } else {
                name.style.borderBottomColor = '';
            }

            // Проверяем телефон
            if (!phone.value.trim()) {
                phone.style.borderBottomColor = '#e94560';
                isValid = false;
            } else {
                phone.style.borderBottomColor = '';
            }

            if (!isValid) {
                return;
            }

            // Успешная отправка
            if (successMsg) {
                successMsg.textContent = 'Ваша заявка отправлена! Мы свяжемся с вами в ближайшее время.';
                successMsg.style.display = 'block';
                form.reset();

                setTimeout(() => {
                    successMsg.style.display = 'none';
                }, 5000);
            }
        });

        // Убираем красную подсветку при вводе
        document.querySelectorAll('#name, #phone').forEach(input => {
            input.addEventListener('input', function() {
                if (this.value.trim()) {
                    this.style.borderBottomColor = '';
                }
            });
        });
    }
});
