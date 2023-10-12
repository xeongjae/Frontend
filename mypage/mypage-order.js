//oder data 가져오는 함수
async function fetchOrderData(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("데이터 가져오기 실패");
  }
  const resQuery = await res.json();
  return resQuery.data;
}
//아이템 이미지 가져오는 함수
async function fetchItemImage(itemId) {
  const itemResponse = await fetch(`/api/items/${itemId}`);
  if (!itemResponse.ok) {
    throw new Error("이미지 가져오기 실패");
  }
  const itemData = await itemResponse.json();
  return itemData.item.main_image[0];
}
//주문 내역 폼 만들기
function createOrderElement(obj, itemImg, orderStatusValue) {
  const orderBox = document.createElement("div");
  orderBox.classList.add("order-box");

  let orderStatus;
  if (orderStatusValue === "ORDER_CONFIRMED") {
    orderStatus = "주문 확인";
  } else if (orderStatusValue === "PREPARING_FOR_SHIPMENT") {
    orderStatus = "배송 준비";
  } else if (orderStatusValue === "SHIPPED") {
    orderStatus = "배송 중";
  } else if (orderStatusValue === "DELIVERED") {
    orderStatus = "배송 완료";
  }

  orderBox.innerHTML = `
    <div class="title-box">
      <span>결제</span>
      <span>${obj.pay_method}X</span>
    </div>
    <div class="item-box">
      <div class="left-item">
        <img src="${itemImg}" alt="" />
        <img src="/cart/img/Plant1.jpg" alt="" />
        <div class="text-box">
          <span class="date-text">10.10 ${orderStatus}</span>
          <span class="name-text">${obj.name}</span>
          <span class="price-text">${obj.total_price}원</span>
          <span class="please"> 요청사항: ${obj.request}</span>
          <span class="order-text">주문상세></span>
        </div>
      </div>
      <div class="cancle-box">
        <button class="cancle-btn"> 주문 취소 </button>
      </div>
    </div>
  `;

  return orderBox;
}
//주문 취소 버튼 visibility
function updateCancelButtonVisibility(orderStatusValue, canclebtnList) {
  const isShipped =
    orderStatusValue === "SHIPPED" || orderStatusValue === "DELIVERED";
  for (const canclebtn of canclebtnList) {
    canclebtn.style.display = isShipped ? "none" : "block";
  }
}
//화면에 로드시키기
async function loadOderData() {
  const contentBox = document.querySelector(".content-box");
  const url = "/api/order/1";

  try {
    const resData = await fetchOrderData(url);

    if (resData.status === 200) {
      const odersArr = resData.orders;
      const canclebtnList = document.getElementsByClassName("cancle-btn");

      for (const obj of odersArr) {
        const orderStatusValue = obj.order_status;
        const itemImg = await fetchItemImage(obj.orderItems.item_id);
        const orderElement = createOrderElement(obj, itemImg, orderStatusValue);

        contentBox.appendChild(orderElement);
      }

      updateCancelButtonVisibility(orderStatusValue, canclebtnList);
    } else {
      alert("데이터 가져오기를 실패했습니다.");
    }
  } catch (error) {
    console.error("오류 발생:", error);
    alert("서버 오류가 발생했습니다.");
  }
}

document.addEventListener("DOMContentLoaded", loadOderData);
