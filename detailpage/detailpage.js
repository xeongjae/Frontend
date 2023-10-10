const MinusBtn = document.querySelector(".btn-minus");
const PlusBtn = document.querySelector(".btn-plus");
const Qty = document.querySelector(".input-count");
const Price = document.querySelector(".item-price");

const ProductName = document.querySelector(".product_name");
const ProductPrice = document.querySelector(".product_price");
const Description = document.querySelector(".company_mindset_text");

const uni1 = sessionStorage.getItem("selectedCategoryValue");
const uni2 = sessionStorage.getItem("selectedItemValue");
const URL = "http://kdt-sw-6-team08.elicecoding.com";

// 카테고리 목록을 가져오는 요청을 보냅니다.
fetch(`${URL}/categories/${uni1}/items`)
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
