// Create floating hearts
function createHearts() {
    const container = document.getElementById('hearts-container');
    const heartCount = 30;

    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤';
        heart.classList.add('heart');

        // Random position
        heart.style.left = Math.random() * 100 + 'vw';

        // Random size
        const size = Math.random() * 20 + 10;
        heart.style.fontSize = size + 'px';

        // Random animation delay
        heart.style.animationDelay = Math.random() * 5 + 's';

        // Random animation duration
        const duration = Math.random() * 10 + 10;
        heart.style.animationDuration = duration + 's';

        container.appendChild(heart);
    }
}

// Initialize Swiper slider
let swiper;

document.addEventListener('DOMContentLoaded', function() {
    createHearts();

    // Initialize Swiper
    swiper = new Swiper('.main-swiper', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,

        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        // And if we need scrollbar
        scrollbar: {
            el: '.swiper-scrollbar',
        },

        // Auto play
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },

        // Effect
        effect: 'slide',

        // Speed of transition
        speed: 800,

        // Enable slides per view
        slidesPerView: 1,

        // Space between slides
        spaceBetween: 0,
    });

    // Add click event to all slide images to open lightbox
    const slideElements = document.querySelectorAll('.swiper-slide');
    slideElements.forEach((slide, index) => {
        slide.addEventListener('click', function() {
            // Calculate the actual index since Swiper duplicates slides for looping
            const actualIndex = index % 6; // Since we have 6 actual slides
            openLightbox(actualIndex);
        });
    });
});

// Lightbox functionality
let lightboxIndex = 0;
const lightboxImages = [
    {src: "/love/images/IMG_8176.jpg", caption: "Wedding Day"},
    {src: "/love/images/IMG_8212.jpg", caption: "Special Moment"},
    {src: "/love/images/IMG_8247.jpg", caption: "Our Journey"},
    {src: "/love/images/IMG_8251.jpg", caption: "Together Forever"},
    {src: "/love/images/IMG_8310.jpg", caption: "Love Story"},
    {src: "/love/images/IMG_2479.jpg", caption: "Happily Ever After"}
];

function openLightbox(index) {
    lightboxIndex = index;
    const modal = document.getElementById("lightbox-modal");
    const lightboxImg = document.getElementById("lightbox-img");
    const captionText = document.getElementById("lightbox-caption");

    lightboxImg.src = lightboxImages[lightboxIndex].src;
    captionText.innerHTML = lightboxImages[lightboxIndex].caption;
    modal.style.display = "block";

    // Prevent scrolling when lightbox is open
    document.body.style.overflow = "hidden";

    // Disable Swiper autoplay when lightbox is open
    if (swiper.autoplay.running) {
        swiper.autoplay.stop();
    }
}

function closeLightbox() {
    document.getElementById("lightbox-modal").style.display = "none";
    // Re-enable scrolling
    document.body.style.overflow = "auto";

    // Restart Swiper autoplay when lightbox is closed
    swiper.autoplay.start();
}

function changeLightboxImage(n) {
    lightboxIndex += n;

    if (lightboxIndex >= lightboxImages.length) {
        lightboxIndex = 0;
    } else if (lightboxIndex < 0) {
        lightboxIndex = lightboxImages.length - 1;
    }

    const lightboxImg = document.getElementById("lightbox-img");
    const captionText = document.getElementById("lightbox-caption");

    lightboxImg.src = lightboxImages[lightboxIndex].src;
    captionText.innerHTML = lightboxImages[lightboxIndex].caption;

    // Update Swiper to show corresponding slide
    swiper.slideTo(lightboxIndex, 800, false);
}

// Close lightbox when clicking outside the image
window.onclick = function(event) {
    const modal = document.getElementById("lightbox-modal");
    if (event.target === modal) {
        closeLightbox();
    }
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', function(e) {
    if (document.getElementById("lightbox-modal").style.display === "block") {
        if (e.key === "Escape") {
            closeLightbox();
        } else if (e.key === "ArrowLeft") {
            changeLightboxImage(-1);
        } else if (e.key === "ArrowRight") {
            changeLightboxImage(1);
        }
    }
});