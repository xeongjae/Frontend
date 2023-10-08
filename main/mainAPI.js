fetch("/api/api.json")
  .then((res) => {
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  })
  .then((data) => {
    PopularItem(data);
  })
  .catch((error) => {
    console.log(error);
  });

function PopularItem(data) {
  // PopularContainer를 선택합니다.
  const PopularContainer = document.querySelector(".PopularContainer");

  // 각 카테고리에 대한 탭을 생성합니다.
  data.categories.forEach((category) => {
    // 각 카테고리에 대한 section을 생성합니다.
    const CategorySection = document.createElement("section");
    CategorySection.classList.add("Popular");

    // 카테고리 이름을 section에 추가합니다.
    CategorySection.innerHTML = `
        <div class="Product_Tiitle">
          <div class="Eng_Title">POPULAR ${category.name}</div>
          <div class="KR_Title">이달의 신상품</div>
        </div>
      `;

    // Product_Col을 생성합니다.
    const ProductCol = document.createElement("div");
    ProductCol.classList.add("Product_Col");
    CategorySection.appendChild(ProductCol);

    // 각 카테고리에서 최대 3개의 아이템을 보여줍니다.
    for (let i = 0; i < Math.min(3, category.item.length); i++) {
      const Item = category.item[i];
      const Product = document.createElement("div");
      Product.classList.add("Popular_Product");
      Product.innerHTML = `
          <div class="Product_Img">
            <img src="${Item.main_image[0]}" alt="" />
          </div>
          <div class="Product_Name">${Item.name}</div>
          <div class="Product_Price">${Item.price} 원</div>
        `;

      // Product를 Product_Col에 추가합니다.
      ProductCol.appendChild(Product);

      //hover했을 때 hover이미지가 나오도록 구현
      const ProductImg = Product.querySelector(".Product_Img img");
      ProductImg.addEventListener("mouseenter", function () {
        ProductImg.src = `${Item.main_image[1]}`;
      });
      ProductImg.addEventListener("mouseleave", function () {
        ProductImg.src = `${Item.main_image[0]}`;
      });
    }

    // PopularContainer에 카테고리 section을 추가합니다.
    PopularContainer.appendChild(CategorySection);
  });
}
