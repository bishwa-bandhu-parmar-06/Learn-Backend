const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.next-slide');
const prevBtn = document.querySelector('.prev-slide');

let slideIndex = 0;
let autoSlideInterval;


// function startAutoSlide() {
//     autoSlideInterval = setInterval(nextSlide, 2000); // Change slide every 5 seconds
// }
// function stopAutoSlide() {
//     clearInterval(autoSlideInterval);
// }
// // Initial setup
// slides[slideIndex].classList.add('active');
// startAutoSlide();
  
  
// slides[slideIndex].classList.add('active');

nextBtn.addEventListener('click', () =>{
    nextSlide();
    // stopAutoSlide();
    // startAutoSlide();
});
prevBtn.addEventListener('click', () => {
    prevSlide();
    // stopAutoSlide();
    // startAutoSlide();
});

function nextSlide() {
    slides[slideIndex].classList.remove('active');
    slideIndex = (slideIndex === slides.length - 1) ? 0 : slideIndex + 1;
    slides[slideIndex].classList.add('active');
    slider.style.transform = `translateX(-${slideIndex * 100}%)`;
}
function prevSlide() {
    slides[slideIndex].classList.remove('active');
    slideIndex = (slideIndex === 0 ) ? slides.length - 1 : slideIndex - 1;
    slides[slideIndex].classList.add('active');
    slider.style.transform = `translateX(-${slideIndex * 100}%)`;
}