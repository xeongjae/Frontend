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
const inputDate = document.querySelector("#desc-date");
const inputPhone = document.querySelector("#desc-phone");
// const inputEmail = document.querySelector("#desc-email");
const inputAddress = document.querySelector("#desc-adress");
const inputDetailAddress = document.querySelector("#desc-detail-adress");
const inputRequest = document.querySelector("#desc-messege");
const submitBtn = document.querySelector("#button-submit");
const deleteBtn = document.querySelector("#button-delete");

let updateId = null;

async function order() {
  // 주문리스트 가져오기
  const res = await fetch(`/api/order/${page}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
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
      <td>${order.order_status}</td>
    </tr>
    `;
  });
  for (let i = 1; i <= Number(data.totalPage); i++) {
    pagination.innerHTML += `<a href="?page=${i}">${i}</a>`;
  }
  function detailView(e) {
    const idx = e.target.parentElement.id.replace("order-", "");
    const order = orders[idx];
    console.log(order);
    updateId = order.id;

    inputId.innerHTML = order.id;
    inputPrice.innerHTML = order.total_price;
    inputName.innerHTML = order.name;
    inputAddress.innerHTML = order.address;
    inputDetailAddress.innerHTML = order.detail_address || "";
    inputStatus.innerHTML = order.order_status;
    inputPhone.innerHTML = order.phone;
    inputRequest.innerHTML = order.request;
    inputPayMethod.innerHTML = order.pay_method;
    //inputEmail.innerHTML  = order.email;
    inputDate.innerHTML = order.createdAt;

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
  if (updateId) {
    const res = await fetch(`/api/orders/${updateId}`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: {
        data: {
          order_status: inputStatus.innerHTML,
        },
      },
    });
    if (res.ok) {
      alert("주문 상태가 변경되었습니다.");
      location.href = `?category=${categoryId}&page=${page}`;
    } else {
      alert(`주문 상태 변경에 실패하였습니다. error : ${data.message}`);
    }
  }
});
