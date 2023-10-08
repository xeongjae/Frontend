const MinusBtn = document.querySelectorAll(".btn-minus");
const PlusBtn = document.querySelectorAll(".btn-plus");
const Qty = document.querySelector(".input-count");
const Price = document.querySelector(".item-price");
const Total = document.querySelector(".item-total-price");
const Imgs = document.querySelectorAll(".img-items");
const Modal = document.querySelector(".modal");
const ModalImg = document.querySelector(".modal-content");
const CloseModal = document.querySelector(".close-modal");

Imgs.forEach(function (Img) {
  Img.addEventListener("click", function () {
    Modal.style.display = "flex";
    ModalImg.src = this.src;
  });
});

CloseModal.addEventListener("click", function () {
  Modal.style.display = "none";
});

function handleEscKey(event) {
  if (event.key === "Escape") {
    Modal.style.display = "none";
  }
}
document.addEventListener("keydown", handleEscKey);

// 모달 외부 클릭 시 모달 닫기
window.onclick = function (event) {
  if (event.target == Modal) {
    Modal.style.display = "none";
  }
};

MinusBtn.forEach(function (Minus) {
  Minus.addEventListener("click", function () {
    const liElement = Minus.closest("li"); // 현재 버튼과 가장 가까운 li 요소를 찾음
    const ClosetQty = liElement.querySelector(".input-count"); // li 요소 내부에서 input-count 검색
    const Qty = parseInt(ClosetQty.textContent); // 현재 수량 값을 가져옴

    if (Qty > 1) {
      ClosetQty.textContent = Qty - 1; // 수량을 1 감소시킴
    }
  });
});

PlusBtn.forEach(function (Plus) {
  Plus.addEventListener("click", function () {
    const liElement = Plus.closest("li"); // 현재 버튼과 가장 가까운 li 요소를 찾음
    const ClosetQty = liElement.querySelector(".input-count"); // li 요소 내부에서 input-count 검색
    const Qty = parseInt(ClosetQty.textContent); // 현재 수량 값을 가져옴

    ClosetQty.textContent = Qty + 1; // 수량을 1 증가시킴
  });
});
