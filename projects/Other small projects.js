// نظام معرض الصور للمشاريع
class ProjectGallery {
    constructor(container) {
        this.container = container;
        this.slides = container.querySelectorAll('.gallery-slide');
        this.dotsContainer = container.querySelector('.gallery-dots');
        this.prevBtn = container.querySelector('.gallery-prev');
        this.nextBtn = container.querySelector('.gallery-next');
        this.currentSlide = 0;
        this.totalSlides = this.slides.length;
        
        this.init();
    }
    
    init() {
        this.createDots();
        this.addEventListeners();
        this.updateSlides();
        this.startAutoPlay();
    }
    
    createDots() {
        // مسح النقاط الحالية
        this.dotsContainer.innerHTML = '';
        
        // إنشاء نقاط جديدة
        this.slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = `gallery-dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => this.goToSlide(index));
            this.dotsContainer.appendChild(dot);
        });
        
        this.dots = this.dotsContainer.children;
    }
    
    addEventListeners() {
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // إضافة تأثير hover للمعرض
        this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.container.addEventListener('mouseleave', () => this.startAutoPlay());
    }
    
    updateSlides() {
        this.goToSlide(this.currentSlide);
    }
    
    goToSlide(index) {
        // إزالة الفئات من جميع الشرائح
        this.slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // تحديث الفهرس الحالي
        this.currentSlide = index;
        
        // تطبيق الفئة النشطة
        this.slides[index].classList.add('active');
        
        // تحديث النقاط
        if (this.dots) {
            Array.from(this.dots).forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }
    }
    
    nextSlide() {
        const next = (this.currentSlide + 1) % this.totalSlides;
        this.goToSlide(next);
    }
    
    prevSlide() {
        const prev = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.goToSlide(prev);
    }
    
    startAutoPlay() {
        this.stopAutoPlay(); // تنظيف أي interval سابق
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 4000);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

// تهيئة جميع معارض الصور عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    const galleries = document.querySelectorAll('.project-gallery');
    galleries.forEach(gallery => {
        new ProjectGallery(gallery);
    });
});

// تأثيرات scroll سلسة
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});