//import { products, Qty } from "/cart/cart.js";

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM Loaded");
  // 주문자, 배송지 정보 가져오기
  fetch("API", {
    method: "GET",
    headers: {
      Authorization: "검증된 겁근 토큰",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("네트워크 오류");
      }
      return response.json();
    })
    .then((data) => {
      const ordererArea = document.querySelector(".orderer-area");
      ordererArea.textContent = data.name;

      const orderedAddressInput = document.querySelector(".addressInput");
      orderedAddressInput.value = data.address;

      const orderedDetailAddressInput = document.querySelector(
        ".detailAddressInput"
      );
      orderedDetailAddressInput.value = data.detailAddress;
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  // 주소 수정 기능
  document
    .querySelector(".findAddressBtn")
    .addEventListener("click", function () {
      console.log("안녕");
      new daum.Postcode({
        oncomplete: function (data) {
          let addr = "";
          let extraAddr = "";

          const address1Input = document.querySelector(".addressInput");
          const address2Input = document.querySelector(".detailAddressInput");

          if (data.userSelectedType === "R") {
            addr = data.roadAddress;
          } else {
            addr = data.jibunAddress;
          }

          if (data.userSelectedType === "R") {
            if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
              extraAddr += data.bname;
            }
            if (data.buildingName !== "" && data.apartment === "Y") {
              extraAddr +=
                extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
            }
            if (extraAddr !== "") {
              extraAddr = " (" + extraAddr + ")";
            }
          }

          address1Input.value = `${addr} ${extraAddr}`;
          address2Input.placeholder = "상세 주소를 입력해 주세요.";
          address2Input.focus();
        },
      }).open();
    });

  // 주문 상품 목록, 총 결제 금액 (아직 구현되지 않음)
});
