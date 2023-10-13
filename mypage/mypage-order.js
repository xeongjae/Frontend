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
    console.log(data);

    orders.forEach(async ({ order, orderItems }, idx) => {
      const itemCountText = orderItems.length > 1 ? ` 외 ${orderItems.length - 1}` : "";
      const getItem = await fetch(`/api/items/${orderItems[0].item_id}`);
      let { item } = await getItem.json();
      firstItem = item;
      if (!getItem.ok) {
        firstItem = null;
      }

      contentBox.innerHTML += `
        <div class="order-box">
          <div class="title-box">
            <span>${order.createdAt.slice(0, 10)}</span>

            </div>
          <div class="item-box">
          <img src="/${firstItem.main_images[0]}" alt="" />
            <div class="text-box">
              <span class="date-text">${orderStatus[order.order_status]}</span>
              <span class="name-text">${firstItem.name} ${itemCountText}</span>
              <span class="price-text">${numberWithCommas(order.total_price)} 원</span>
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
