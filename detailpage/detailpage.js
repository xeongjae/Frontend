const MinusBtn = document.querySelector(".btn-minus");
const PlusBtn = document.querySelector(".btn-plus");
const Qty = document.querySelector(".input-count");
const Price = document.querySelector(".item-price");
const CartBtn = document.querySelector(".order_save_button");

const ProductName = document.querySelector(".product_name");
const ProductPrice = document.querySelector(".product_price");
const Description = document.querySelector(".company_mindset_text");
const TotalPrice = document.querySelector(".item-price");

const qs = new URLSearchParams(window.location.search);

qs.get("category");
qs.get("item");
const categoryId = qs.get("category");
const ItemId = qs.get("item");
const URL = "http://kdt-sw-6-team08.elicecoding.com";

// 카테고리 목록을 가져오는 요청을 보냅니다.
fetch(`${URL}/categories/${categoryId}/items`, {
  method: "GET",
  headers: {
    Origin: `${URL}`, // 클라이언트의 도메인
    // 기타 헤더 설정
  },
  credentials: "include", // credentials 옵션을 include로 설정
})
  .then((res) => {
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  })
  .then((data) => {
    const items = data.items; // items 배열 가져오기
    const targetItemId = "gmnj7j-NTE1AjEVjnrr40"; // 원하는 id

    // id가 일치하는 아이템을 찾기
    const targetItem = items.find((item) => item.id === targetItemId);
    console.log(targetItem);

    if (targetItem) {
      const itemInfo = {
        name: targetItem.name,
        price: targetItem.price,
        description: targetItem.description,
      };

      ProductName.textContent = `${itemInfo.name}`;
      ProductPrice.textContent = `${itemInfo.price} 원`;
      Description.textContent = `${itemInfo.description}`;
      TotalPrice.textContent = `${itemInfo.price} 원`;

      CartBtn.addEventListener("click", function () {
        localStorage.setItem("productName", itemInfo.name);
        localStorage.setItem("productPrice", itemInfo.price);

        // 저장 완료 메시지 또는 원하는 작업을 수행할 수 있습니다.
        console.log("상품 정보가 저장되었습니다.");
      });

      console.log(itemInfo);
    } else {
      console.log("일치하는 아이템을 찾을 수 없습니다.");
    }
  })
  .catch((error) => {
    console.log(error);
  });

// 현재 수량을 가져오는 함수
function getCurrentQuantity() {
  return parseInt(Qty.textContent);
}

// 더하기 버튼 이벤트 리스너
PlusBtn.addEventListener("click", function () {
  // 현재 수량을 가져온 후 1을 더하고 화면에 업데이트
  const currentQty = getCurrentQuantity();
  Qty.textContent = currentQty + 1;
});

// 빼기 버튼 이벤트 리스너
MinusBtn.addEventListener("click", function () {
  // 현재 수량을 가져온 후 1을 뺀 값이 1 이상이면 화면에 업데이트
  const currentQty = getCurrentQuantity();
  if (currentQty > 1) {
    Qty.textContent = currentQty - 1;
  }
});

CartBtn.addEventListener("click", function () {
  const data = dataInput.value;
  // 로컬 스토리지에 데이터를 저장합니다.
  localStorage.setItem("savedData", data);
});
