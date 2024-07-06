
// let currentIndex = 0;
// function showSlide(index) {
//     const slides = document.querySelectorAll('.carousel-item');
//     if (index >= slides.length) {
//         currentIndex = 0;
//     } else if (index < 0) {
//         currentIndex = slides.length - 1;
//     } else {
//         currentIndex = index;
//     }
//     const offset = -currentIndex * 100;
//     document.querySelector('.carousel-inner').style.transform = `translateX(${offset}%)`;
// }
// function prevSlide() {
//     showSlide(currentIndex - 1);
// }
// function nextSlide() {
//     showSlide(currentIndex + 1);
// }
// showSlide(currentIndex);


document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.carousel-item');
    let index = 0;

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const iframe = entry.target.querySelector('iframe');
                if (iframe && !iframe.src) {
                    iframe.src = iframe.getAttribute('data-src');
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: document.querySelector('.carousel'),
        threshold: 0.5
    });

    slides.forEach(slide => observer.observe(slide));

    function showSlide(i) {
        index = (i + slides.length) % slides.length;
        document.querySelector('.carousel-inner').style.transform = `translateX(${-index * 100}%)`;
        lazyLoadAdjacentSlides();
    }

    function lazyLoadAdjacentSlides() {
        [index - 1, index, index + 1].forEach(i => {
            if (i >= 0 && i < slides.length) {
                const iframe = slides[i].querySelector('iframe');
                if (iframe && !iframe.src) {
                    iframe.src = iframe.getAttribute('data-src');
                }
            }
        });
    }

    document.querySelector('.carousel-controls .carousel-button:nth-child(1)').addEventListener('click', () => showSlide(index - 1));
    document.querySelector('.carousel-controls .carousel-button:nth-child(2)').addEventListener('click', () => showSlide(index + 1));

    // Initial load
    showSlide(index);
});
