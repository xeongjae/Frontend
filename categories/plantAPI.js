const ProductColContainer = document.querySelector(".Product_Col_Container");

fetch("/api/api.json")
  .then((res) => {
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  })
  .then((data) => {
    ItemCategory(data, ProductColContainer);
  })
  .catch((error) => {
    console.log(error);
  });

function ItemCategory(data, container) {
  let ProductColCount = 0;
  let ProductCol = CreateProductCol();
  for (let j = 0; j < data.categories[0].item.length; j++) {
    let ItemInfo = data.categories[0].item[j];

    const Product = document.createElement("div");
    Product.innerHTML = `<div class="Product">
    <div class="Product_Img" style="background-image: url(${ItemInfo.main_image[0]})"></div>
    <div class="Product_Name">${ItemInfo.name}</div>
    <div class="Product_Price">${ItemInfo.price} 원</div>
    </div>`;
    ProductCol.appendChild(Product);

    //hover했을 때 hover이미지가 나오도록 구현
    const ProductImg = Product.querySelector(".Product_Img");
    ProductImg.addEventListener("mouseenter", function () {
      ProductImg.style.backgroundImage = `url(${ItemInfo.main_image[1]})`;
    });
    ProductImg.addEventListener("mouseleave", function () {
      ProductImg.style.backgroundImage = `url(${ItemInfo.main_image[0]})`;
    });

    if (++ProductColCount === 3) {
      container.appendChild(ProductCol); // 현재의 ProductCol을 문서에 추가
      ProductCol = CreateProductCol(); // 새로운 ProductCol 생성
      ProductColCount = 0; // ProductCol 개수 초기화
    }
  }

  if (ProductColCount > 0) {
    container.appendChild(ProductCol);
  }
}

function CreateProductCol() {
  const ProductCol = document.createElement("div");
  ProductCol.className = "Product_Col"; // 원하는 클래스 이름을 여기에 설정하세요.
  return ProductCol;
}
