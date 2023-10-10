const uni1 = sessionStorage.getItem("selectedCategoryValue");

const URL = "http://kdt-sw-6-team08.elicecoding.com";
fetch(`${URL}/categories/${uni1}/items`)
  .then((res) => {
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  })
  .then((data) => {
    ItemCategory(data);
  })
  .catch((error) => {
    console.log(error);
  });

function ItemCategory(data) {
  const ProductColContainer = document.querySelector(".Product_Col_Container");
  let ProductColCount = 0;
  let ProductCol = CreateProductCol();

  // 클릭한 카테고리에 해당하는 상품 데이터를 가져온 데이터로 대체합니다.
  const categoryItems = data.items;

  for (let j = 0; j < categoryItems.length; j++) {
    let ItemInfo = categoryItems[j];
    console.log(ItemInfo);

    const Product = document.createElement("div");
    Product.innerHTML = `<div class="Product">
      <div class="Product_Img" style="background-image: url(${ItemInfo.main_image[0]})"></div>
      <div class="Product_Name">${ItemInfo.name}</div>
      <div class="Product_Price">${ItemInfo.price} 원</div>
    </div>`;
    ProductCol.appendChild(Product);

    // hover했을 때 hover이미지가 나오도록 구현
    const ProductImg = Product.querySelector(".Product_Img");
    ProductImg.addEventListener("mouseenter", function () {
      ProductImg.style.backgroundImage = `url(${ItemInfo.main_image[1]})`;
    });
    ProductImg.addEventListener("mouseleave", function () {
      ProductImg.style.backgroundImage = `url(${ItemInfo.main_image[0]})`;
    });

    if (++ProductColCount === 3) {
      ProductColContainer.appendChild(ProductCol); // 현재의 ProductCol을 문서에 추가
      ProductCol = CreateProductCol(); // 새로운 ProductCol 생성
      ProductColCount = 0; // ProductCol 개수 초기화
    }

    Product.onclick = function (event) {
      sessionStorage.setItem("selectedItemValue", ItemInfo.id);
      window.location.href = `/detailpage/detailpage.html?category=${uni1}&ItemInfo=${ItemInfo.id}`;
    };
  }

  if (ProductColCount > 0) {
    ProductColContainer.appendChild(ProductCol);
  }
}

function CreateProductCol() {
  const ProductCol = document.createElement("div");
  ProductCol.className = "Product_Col"; // 원하는 클래스 이름을 여기에 설정하세요.
  return ProductCol;
}
