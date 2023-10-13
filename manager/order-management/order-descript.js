document.addEventListener("DOMContentLoaded", function () {
  const btnDescriptions = document.querySelectorAll("#item-box");
  const btnDeletes = document.querySelector("#button-delete-order");

  const DescriptionNumberEl = document.getElementById("desc-code");
  const DescriptionCountEl = document.getElementById("desc-count");
  const DescriptionpriceEl = document.getElementById("desc-price");
  const DescriptionOrderNumberEl = document.getElementById("desc-order-number");
  const DescriptionMethodEl = document.getElementById("desc-method");
  const DescriptionNickNameEl = document.getElementById("desc-nickname");
  const DescriptionPhoneEl = document.getElementById("desc-phone");
  const DescriptionEmailEl = document.getElementById("desc-email");
  const DescriptionAdressEl = document.getElementById("desc-adress");
  const DescriptionStateEl = document.getElementById("desc-state");
  const DescriptionDiscountEl = document.getElementById("desc-discount");
  const DescriptionMessegeEl = document.getElementById("desc-messege");
  const DescriptionDateEl = document.getElementById("desc-messege");

  function reflectDesction(event) {
    const clickedItemBox = event.currentTarget;

    const orderEmail = clickedItemBox.querySelector("#order-email").textContent;
    const orderNumber =
      clickedItemBox.querySelector("#order-number").textContent;
    const orderDate = clickedItemBox.querySelector("#order-date").textContent;
    const orderState = clickedItemBox.querySelector("#order-state").textContent;

    DescriptionOrderNumberEl.textContent = orderNumber;
    DescriptionEmailEl.textContent = orderEmail;
    DescriptionDateEl.textContent = orderDate;
    DescriptionStateEl.textContent = orderState;
  }

  function deleteOrder() {
    const orderNum = document.getElementById("desc-order-number").innerText;

    btnDescriptions.forEach((btn) => {
      const id = btn.getAttribute("data-id");

      if (orderNum === id) {
        btn.remove();
      }
    });
  }

  btnDescriptions.forEach((btn) => {
    btn.addEventListener("click", reflectDesction);
  });

  btnDeletes.addEventListener("click", deleteOrder);
});
