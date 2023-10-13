//아이템 이미지 가져오는 함수
async function fetchItemImage(itemId) {
  const itemResponse = await fetch(`/api/items/${itemId}`);
  if (!itemResponse.ok) {
    throw new Error("이미지 가져오기 실패");
  }
  const itemData = await itemResponse.json();
  return itemData.item.main_image[0];
}
const orderStatus = {
  ORDER_CONFIRMED: "주문완료",
  PREPARING_FOR_SHIPMENT: "배송준비",
  SHIPPED: "배송완료",
  DELIVERED: "배송중",
};
//주문 내역 폼 만들기
function createOrderElement(obj, itemImg, orderStatusValue) {
  const orderBox = document.createElement("div");
  orderBox.classList.add("order-box");

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
  const isShipped = orderStatusValue === "SHIPPED" || orderStatusValue === "DELIVERED";
  for (const canclebtn of canclebtnList) {
    canclebtn.style.display = isShipped ? "none" : "block";
  }
}
//화면에 로드시키기
const contentBox = document.querySelector("#content-box");
async function loadOderData() {
  const contentBox = document.querySelector(".content-box");
  const url = "/api/order/1";

  try {
    const resData = await fetch("/api/order/1", {
      headers: {
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    const data = await resData.json();
    const orders = data.data;
    console.log(orders);
    orders.forEach(async ({ order, orderItems }) => {
      console.log(orderItems);
      const getItem = await fetch(`/api/items/${orderItems[0].id}`);
      let firstItem = await getItem.json();
      if (!getItem.ok) {
        firstItem = null;
      }

      contentBox.innerHTML += `
        <div class="order-box">
          <div class="title-box">
            <span>${orderStatus[order.order_status]}</span>
            <span><a href="">주문상세 ></a></span>
            </div>
          <div class="item-box">
          <img src="/cart/img/Plant1.jpg" alt="" />
            <div class="text-box">
              <span class="date-text">${order.createdAt.slice(0, 10)}</span>
              <span class="name-text">${firstItem?.name || "엘호 물뿌리개(흰색)"}</span>
              <span class="price-text">${order.total_price}</span>
              <span class="order-text">주문 ID: ${order.id}</span>
            </div>
          </div>
        </div>
      `;
    });
  } catch (error) {
    console.error("오류 발생:", error);
    alert("서버 오류가 발생했습니다.");
  }
}

document.addEventListener("DOMContentLoaded", loadOderData);
