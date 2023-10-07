const modalOpen = document.querySelectorAll("#open-modal");
const modalEl = document.createElement("div");
const modalLayoutElement = document.querySelector(".modal-layout");

const modal = `
<div class="modal-card">
  <div class="modal-item-box">

  <div class="modal-item">
    <h3 style="font-weight:bold">상품번호</h3>
    <input type="text" value="123456655"></input>
  </div>

  <div class="modal-item">
    <h3 style="font-weight:bold">상품명</h3>
    <input type="text" value="토끼 화분"></input>
  </div>

  <div class="modal-item">
    <h3 style="font-weight:bold">닉네임</h3>
    <input type="text" value="가좌동코코넛도둑"></input>
  </div>

  <div class="modal-item">
    <h3 style="font-weight:bold">배송상태</h3>
    <input type="text" value="배송완료"></input>
  </div>

  <div class="modal-item">
    <h3 style="font-weight:bold">할인적용</h3>
    <input type="text" value="적용"></input>
  </div>

  <div class="modal-item">
    <h3 style="font-weight:bold">결제방식</h3>
    <input type="text" value="뭔가"></input>
  </div>

  <div class="modal-item">
    <h3 style="font-weight:bold">수량</h3>
    <input type="text" value="2"></input>
  </div>

  <div class="modal-item">
    <h3 style="font-weight:bold">상품 상세</h3>
    <input type="text" value="api로 받을 데이터"></input>
  </div>

  <div class="modal-item">
    <h3 style="font-weight:bold">이메일</h3>
    <input type="text" value="cosmoyj7733@gmail.com"></input>
  </div>

  <div>
    <h3 style="font-weight:bold">전화번호</h3>
    <input type="text" value="010-9376-9605"></input>
  </div>

  <div class="modal-item">
    <h3 style="font-weight:bold">주문 메세지</h3>
    <input class="input-order-massage" type="text" value="어쩌구저쩌구"></input>
  </div>

  </div>

  <div class="modal-button-box">
    <button class="modal-button-post">저장</button>
    <button class="modal-button-exit">나가기</button>
  </div>
</div>
`;
function closeModalOnEsc(event) {
  if (event.key === "Escape") {
    closeModal();
  }
}

function closeModalOnLayout() {
  closeModal();
}

function closeModal() {
  document.body.removeChild(modalEl);

  window.removeEventListener("keydown", closeModalOnEsc);
}

function createModal() {
  modalEl.setAttribute("class", "modal-layout");

  modalEl.innerHTML = modal;
  document.body.prepend(modalEl);

  window.addEventListener("keydown", closeModalOnEsc);

  document
    .querySelector(".modal-button-exit")
    .addEventListener("click", closeModal);
}

modalOpen.forEach((btn) => {
  btn.addEventListener("click", createModal);
});

modalLayoutElement.addEventListener("click", closeModalOnLayout());
