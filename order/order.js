//import { products, Qty } from "/cart/cart.js";

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM Loaded");
  const address2Input = document.querySelector(".detailAddressInput");
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

      const phoneNumberArea = document.querySelector(".phoneNumber-area");
      phoneNumberArea.textContent = data.phone;

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
  //이름, 전화번호 수정 관련 기능
  document
    .querySelector(".edit-name-btn")
    .addEventListener("click", function () {
      const ordererInput = document.querySelector(".ordererInput");
      if (ordererInput.hasAttribute("readonly")) {
        ordererInput.removeAttribute("readonly");
        ordererInput.addEventListener(
          "blur",
          function () {
            ordererInput.setAttribute("readonly", true);
          },
          { once: true }
        );
      } else {
        ordererInput.setAttribute("readonly", true);
      }
      ordererInput.focus();
    });

  document
    .querySelector(".edit-phone-btn")
    .addEventListener("click", function () {
      const phoneNumberInput = document.querySelector(".phoneNumberInput");
      if (phoneNumberInput.hasAttribute("readonly")) {
        phoneNumberInput.removeAttribute("readonly");
        phoneNumberInput.addEventListener(
          "blur",
          function () {
            phoneNumberInput.setAttribute("readonly", true);
          },
          { once: true }
        );
      } else {
        phoneNumberInput.setAttribute("readonly", true);
      }
      phoneNumberInput.focus();
    });
  // 전화번호 입력 시 자동 형식 변환 기능
  document
    .querySelector(".phoneNumberInput")
    .addEventListener("input", function (e) {
      const input = e.target;
      let value = input.value.replace(/\D/g, ""); // 숫자만 남긴다

      if (value.length <= 3) {
        input.value = value;
      } else if (value.length <= 7) {
        input.value = `${value.substr(0, 3)}-${value.substr(3)}`;
      } else {
        input.value = `${value.substr(0, 3)}-${value.substr(
          3,
          4
        )}-${value.substr(7, 4)}`;
      }

      if (input.value.length > 13) {
        input.value = input.value.slice(0, 13);
      }
    });

  // 배송지 수정 기능
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
          address2Input.removeAttribute("readonly");
          address2Input.placeholder = "상세 주소를 입력해 주세요.";
          address2Input.focus();
        },
      }).open();
    });
  // 상세 주소 입력창에서 커서가 떠났을 때 다시 readonly
  address2Input.addEventListener("blur", function () {
    address2Input.setAttribute("readonly", true);
  });

  // 주문 상품 목록, 총 결제 금액 (아직 구현되지 않음)
});
document.querySelector(".purchase-btn").addEventListener("click", function () {
  window.location.href = "/order-completed/order-completed.html";
  alert("주문이 완료 되었습니다!");
});
