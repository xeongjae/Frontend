function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const contentBox = document.querySelector("#content-box");
const orderStatus = {
  ORDER_CONFIRMED: "결제완료",
  PREPARING_FOR_SHIPMENT: "상품준비중",
  SHIPPED: "배송완료",
  DELIVERED: "배송중",
};
let orders = null;

async function loadOderData() {
  const contentBox = document.querySelector(".content-box");
  const url = "/api/order/1";

  try {
    const resData = await fetch("/api/order/1?perPage=30", {
      headers: {
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    const data = await resData.json();
    orders = data.data;

    orders.forEach(async ({ order, orderItems }, idx) => {
      const itemCountText = orderItems.length > 1 ? ` 외 ${orderItems.length - 1}` : "";
      const getItem = await fetch(`/api/items/${orderItems[0].id}`);
      let firstItem = await getItem.json();
      if (!getItem.ok) {
        firstItem = null;
      }

      contentBox.innerHTML += `
        <div class="order-box">
          <div class="title-box">
            <span>${order.createdAt.slice(0, 10)}</span>
            <span onclick=detail(${idx})><a>주문상세 ></a></span>
            </div>
          <div class="item-box">
          <img src="${firstItem?.main_image[0] || "/cart/img/Plant1.jpg"}" alt="" />
            <div class="text-box">
              <span class="date-text">${orderStatus[order.order_status]}</span>
              <span class="name-text">${firstItem?.name || "엘호 물뿌리개(흰색)" + itemCountText}</span>
              <span class="price-text">${numberWithCommas(order.total_price)}</span>
              <span class="order-text">주문 ID: ${order.id}</span>
            </div>
          </div>
        </div>
      `;
    });
  } catch (error) {
    console.error("오류 발생:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadOderData);

async function detail(idx) {
  const order = orders[Number(idx)];
}
