let SlideIndex = 0; // 현재 슬라이드 인덱스
let SlideInterval = 2000; // 슬라이드 전환 간격 (밀리초)

function ShowSlides() {
  let Slides = document.getElementsByClassName("mySlides");
  let Size = Slides.length;

  // 현재 슬라이드를 숨김
  for (var i = 0; i < Size; i++) {
    Slides[i].style.display = "none";
  }

  // 다음 슬라이드로 이동
  SlideIndex++;
  if (SlideIndex >= Size) {
    SlideIndex = 0; // 처음 슬라이드로 이동
  }

  // 현재 슬라이드를 표시
  Slides[SlideIndex].style.display = "block";

  // 다음 슬라이드 전환을 예약
  setTimeout(ShowSlides, SlideInterval);
}

// 페이지 로드 후 슬라이드 쇼 시작
window.onload = function () {
  ShowSlides(); // 초기 슬라이드 표시
};
