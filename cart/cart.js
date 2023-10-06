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

// 모달 외부 클릭 시 모달 닫기
window.onclick = function (event) {
  if (event.target == Modal) {
    Modal.style.display = "none";
  }
};

// 초기 가격 값 가져오기
const InitialPrice = convertnum(Price);

MinusBtn.forEach(function (Minus) {
  Minus.addEventListener("click", function () {
    const liElement = Minus.closest("li"); // 현재 버튼과 가장 가까운 li 요소를 찾음
    const ClosetQty = liElement.querySelector(".input-count"); // li 요소 내부에서 input-count 검색
    if (Qty.value > 1) {
      ClosetQty.textContent--;
      TotalPrice();
    }
  });
});

PlusBtn.forEach(function (Plus) {
  Plus.addEventListener("click", function () {
    const liElement = Plus.closest("li"); // 현재 버튼과 가장 가까운 li 요소를 찾음
    const ClosetQty = liElement.querySelector(".input-count"); // li 요소 내부에서 input-count 검색
    ClosetQty.textContent++;
    TotalPrice();
  });
});

//convertnum으로 38,000원을 38000으로 추출하고 formatPrice로 뒤에 원을 다시 붙이고 Total을 사용해서 qty와 수량 * 물건에 가격을 곱하여서 출력
function convertnum(priceStr) {
  const numpart = parseFloat(
    priceStr.textContent.replace(/,/g, "").replace("원", "")
  );
  return numpart;
}

function FormatPrice(price) {
  return price.toLocaleString() + "원";
}

function TotalPrice() {
  const total = Qty.textContent * InitialPrice;
  Price.textContent = FormatPrice(total);
}
