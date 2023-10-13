const qs = new URLSearchParams(window.location.search);
const page = qs.get("page");
const orderTable = document.querySelector("#order-table tbody");
const pagination = document.querySelector("#pagination div");

const updateFormBox = document.querySelector("#update-form-box");
const inputStatus = document.querySelector("#desc-status");
const inputId = document.querySelector("#desc-id");
const inputPrice = document.querySelector("#desc-price");
const inputPayMethod = document.querySelector("#desc-method");
const inputName = document.querySelector("#desc-name");
const inputEmail = document.querySelector("#desc-email");
const inputDate = document.querySelector("#desc-date");
const inputPhone = document.querySelector("#desc-phone");
// const inputEmail = document.querySelector("#desc-email");
const inputAddress = document.querySelector("#desc-adress");
const inputDetailAddress = document.querySelector("#desc-detail-adress");
const inputRequest = document.querySelector("#desc-messege");
const submitBtn = document.querySelector("#button-submit");
const deleteBtn = document.querySelector("#button-delete");

let updateId = null;
const orderStatus = {
  ORDER_CONFIRMED: "주문 완료",
  PREPARING_FOR_SHIPMENT: "배송 준비 중",
  SHIPPED: "배송 완료",
  DELIVERED: "배송 중",
};

async function order() {
  // 주문리스트 가져오기
  const res = await fetch(`/api/order/${page}`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  });

  if (!res.ok) {
    console.log(res);
  }
  const data = await res.json();
  const orders = data.data;
  orders.map((order, idx) => {
    orderTable.innerHTML += `
    <tr id="order-${idx}">
      <td>${order.id}</td>
      <td>${order.name}</td>
      <td>${order.email}</td>
      <td>${order.createdAt.slice(0, 10)}</td>
      <td>${orderStatus[order.order_status]}</td>
    </tr>
    `;
  });
  for (let i = 1; i <= Number(data.totalPage); i++) {
    pagination.innerHTML += `<a href="?page=${i}">${i}</a>`;
  }
  function detailView(e) {
    const idx = e.target.parentElement.id.replace("order-", "");
    const order = orders[idx];
<<<<<<< Updated upstream
    console.log(order);
    updateId = order._id;
=======
    updateId = order.id;
>>>>>>> Stashed changes

    inputId.innerHTML = order.id;
    inputPrice.innerHTML = order.total_price;
    inputName.innerHTML = order.name || "데이터가 존재하지 않습니다.";
    inputEmail.innerHTML = order.email;
    inputAddress.innerHTML = `${order.address} ${order.detail_address || ""}`;
    inputStatus.value = order.order_status;
    inputPhone.innerHTML = order.phone || "데이터가 존재하지 않습니다.";
    inputRequest.innerHTML = order.request || "요청 사항이 없습니다.";
    inputPayMethod.innerHTML = order.pay_method;
    //inputEmail.innerHTML  = order.email;
    inputDate.innerHTML = order.createdAt.slice(0, 19).replace(/[A-z]/g, " / ");

    for (let i = 0; i < orders.length; i++) {
      const tr = document.querySelector(`#order-${i}`);
      tr.classList.remove("select-order");
    }
    e.target.parentElement.classList.add("select-order");
  }

  orderTable.addEventListener("click", async function (e) {
    e.preventDefault();
    detailView(e);
  });
  detailView({ target: orderTable.querySelector("#order-0 td") });
}

order();

updateFormBox.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log(inputStatus.value);
  console.log(updateId);
  if (updateId) {
    const res = await fetch(`/api/order/admin/${updateId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        data: {
          order_status: inputStatus.value,
        },
      }),
    });
    if (res.ok) {
      alert("주문 상태가 변경되었습니다.");
      location.href = `?&page=${page}`;
    } else {
      const data = await res.json();
      alert(`주문 상태 변경에 실패하였습니다. error : ${data.message}`);
    }
  }
});

deleteBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  if (updateId) {
    if (confirm(`주문을 삭제할까요?`)) {
      const res = await fetch(`/api/order/admin/${updateId}`, {
        method: "DELETE", // DELETE 요청으로 변경
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      if (res.ok) {
        alert("주문이 삭제되었습니다.");
      } else {
        const data = await res.json();
        alert(`주문 삭제에 실패하였습니다. error: ${data.message}`);
      }
    }
    location.href = `?page=${page}`;
  }
});
