document.addEventListener("DOMContentLoaded", function () {
  fetch("/api/order", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      const ordererArea = document.querySelector(".orderer-name-area");
      ordererArea.textContent = data.name;

      const phoneNumberArea = document.querySelector(".phone-number-area");
      phoneNumberArea.textContent = data.phone;

      const orderedAddressInput = document.querySelector(".address-area");
      orderedAddressInput.textContent = data.address;

      const orderedDetailAddressInput = document.querySelector(
        ".detail-address-area"
      );
      orderedDetailAddressInput.textContent = data.detail_address;

      const orderedProducts = document.querySelector(".ordered-products-area");
      const productHtml = data.orderItems
        .map((item) => {
          return `<div class="product-item">
                <span>${item.상품이름} - ${item.quantity}개 / ${item.unit_price} 원</span>
              </div>`;
        })
        .join("");
      orderedProducts.innerHTML = productHtml;

      const totalPriceArea = document.querySelector(".total-price-area");
      totalPriceArea.textContent = `${data.total_price} 원`;
    })
    .catch((error) => {
      console.log(error);
    });
});
