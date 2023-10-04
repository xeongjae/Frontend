var slideIndex = 0; // 현재 슬라이드 인덱스
var slideInterval = 2000; // 슬라이드 전환 간격 (밀리초)

function showSlides() {
    var slides = document.getElementsByClassName("mySlides");
    var size = slides.length;

    // 현재 슬라이드를 숨김
    for (var i = 0; i < size; i++) {
        slides[i].style.display = "none";
    }

    // 다음 슬라이드로 이동
    slideIndex++;
    if (slideIndex >= size) {
        slideIndex = 0; // 처음 슬라이드로 이동
    }

    // 현재 슬라이드를 표시
    slides[slideIndex].style.display = "block";

    // 다음 슬라이드 전환을 예약
    setTimeout(showSlides, slideInterval);
}

// 페이지 로드 후 슬라이드 쇼 시작
window.onload = function () {
    showSlides(); // 초기 슬라이드 표시
};
