let currentSlide = 0;
const slides = document.querySelectorAll(".image_slider img");
const slideWidth = slides[0].clientWidth;

document.getElementById("nextSlide").addEventListener("click", () => {
  if (currentSlide < slides.length - 1) {
    currentSlide++;
    slideImages();
  }
});

document.getElementById("prevSlide").addEventListener("click", () => {
  if (currentSlide > 0) {
    currentSlide--;
    slideImages();
  }
});

function slideImages() {
  const slider = document.querySelector(".image_slider");
  slider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}
