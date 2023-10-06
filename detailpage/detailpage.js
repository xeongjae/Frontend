// 이미지 슬라이드 관련 코드
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

// 주문 수량 및 가격 업데이트 관련 코드
const decreaseButton = document.getElementById("decreaseCount");
const increaseButton = document.getElementById("increaseCount");
const orderCountMass = document.querySelector(".order_count_mass");
const orderMoneyMass = document.querySelector(".order_money_mass");
const unitPrice = 33000; // 단위 가격
let count = 0;

decreaseButton.addEventListener("click", function () {
  if (count > 0) {
    count--;
    updateCountAndPrice();
  }
});

increaseButton.addEventListener("click", function () {
  count++;
  updateCountAndPrice();
});

function updateCountAndPrice() {
  orderCountMass.textContent = `${count}개`;
  const totalPrice = count * unitPrice;
  orderMoneyMass.textContent = `${totalPrice.toLocaleString()}원`; // toLocaleString() 함수로 천 단위마다 쉼표 추가
}
