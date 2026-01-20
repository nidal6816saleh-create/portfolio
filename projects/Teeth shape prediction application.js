// معرض الصور مع حلقة لا نهائية - بدون تشغيل تلقائي
class EnhancedImageGallery {
    constructor() {
        this.slides = document.querySelectorAll('.gallery-slide');
        this.dotsContainer = document.querySelector('.gallery-dots');
        this.prevBtn = document.querySelector('.gallery-prev');
        this.nextBtn = document.querySelector('.gallery-next');
        this.currentSlide = 0;
        this.totalSlides = this.slides.length;
        
        this.init();
    }
    
    init() {
        // إنشاء مؤشر الصورة الحالية
        this.createCounter();
        
        // إنشاء نقاط التنقل
        this.createDots();
        
        // إضافة event listeners
        this.addEventListeners();
        
        // تحديث العرض الأولي
        this.updateSlides();
        
        // لا يوجد تشغيل تلقائي - تم إزالته
    }
    
    createCounter() {
        const counter = document.createElement('div');
        counter.className = 'gallery-counter';
        counter.innerHTML = `<span class="current">1</span> / <span class="total">${this.totalSlides}</span>`;
        document.querySelector('.gallery-container').appendChild(counter);
        this.counter = counter;
    }
    
    createDots() {
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
        
        // التنقل بالسهمين
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
        
        // Swipe للهواتف
        this.addSwipeSupport();
    }
    
    addSwipeSupport() {
        let startX = 0;
        const gallery = document.querySelector('.gallery-container');
        
        gallery.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        gallery.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
        });
    }
    
    updateSlides() {
        this.goToSlide(this.currentSlide);
    }
    
    goToSlide(index) {
        // إزالة الفئات من جميع الشرائح
        this.slides.forEach(slide => {
            slide.classList.remove('active', 'prev-slide', 'next-slide');
        });
        
        // تحديث الفهرس الحالي مع حلقة لا نهائية
        this.currentSlide = (index + this.totalSlides) % this.totalSlides;
        
        // حساب الشرائح المجاورة
        const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        const nextIndex = (this.currentSlide + 1) % this.totalSlides;
        
        // تطبيق الفئات
        this.slides[prevIndex].classList.add('prev-slide');
        this.slides[this.currentSlide].classList.add('active');
        this.slides[nextIndex].classList.add('next-slide');
        
        // تحديث النقاط
        if (this.dots) {
            Array.from(this.dots).forEach((dot, i) => {
                dot.classList.toggle('active', i === this.currentSlide);
            });
        }
        
        // تحديث العداد
        this.updateCounter();
    }
    
    nextSlide() {
        const next = this.currentSlide + 1;
        this.goToSlide(next);
    }
    
    prevSlide() {
        const prev = this.currentSlide - 1;
        this.goToSlide(prev);
    }
    
    updateCounter() {
        if (this.counter) {
            const currentElement = this.counter.querySelector('.current');
            if (currentElement) {
                currentElement.textContent = this.currentSlide + 1;
            }
        }
    }
    
}

// تهيئة المعرض عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    new EnhancedImageGallery();
});

const progressBar = document.getElementById('progressBar');

// تحديث الشريط أثناء التشغيل
video.addEventListener('timeupdate', function() {
  progressBar.max = video.duration;
  progressBar.value = video.currentTime;
});

// عند السحب أو التغيير
progressBar.addEventListener('input', function() {
  video.currentTime = progressBar.value;
});
