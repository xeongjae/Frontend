const ContentBox = document.querySelector(".content-box");

for (let i = 0; i < 3; i++) {
  // 새로운 요소를 생성
  const orderBox = document.createElement("div");
  orderBox.classList.add("order-box");

  orderBox.innerHTML = `
    <div class="title-box">
      <span>결제</span>
      <span>X</span>
    </div>
    <div class="item-box">
      <div class="left-item">
        <img src="/cart/img/Plant1.jpg" alt="" />
        <div class="text-box">
          <span class="date-text">10.10 결제완료</span>
          <span class="name-text">국내산 100% 제주도 토종 흙</span>
          <span class="price-text">39000 원</span>
          <span class="please"> 요청사항: 부재시 문 앞에 놔주세요</span>
          <span class="order-text">주문상세></span>
        </div>
      </div>
      <div class="cancle-box">
        <button class="cancle-btn"> 주문 취소 </button>
      </div>
    </div>
  `;

  // 생성된 요소를 ContentBox에 추가
  ContentBox.appendChild(orderBox);
}
