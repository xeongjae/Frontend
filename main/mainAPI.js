const URL = "http://kdt-sw-6-team08.elicecoding.com";
// const res1 = await fetch(`/api/categories`, {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({
//     data: {
//       id: 88,
//       name: "category test ...",
//     },
//   }),
// });
// const data1 = await res1.json();
// console.log("data1", data1);
// 카테고리 목록을 가져오는 요청을 보냅니다.
fetch(`/api/categories`)
  .then((res) => {
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  })
  .then((categories) => {
    // 카테고리 목록을 받은 후에 각각의 카테고리에 대한 요청을 보냅니다.
    categories.categories.forEach((category) => {
      const categoryURL = `/api/categories/${category.id}/items`;

      fetch(categoryURL)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
          PopularItem(data);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  })
  .catch((error) => {
    console.log(error);
  });

function PopularItem(data) {
  // API 데이터를 그룹화하기 위한 객체를 생성합니다.
  const categoryDataMap = {};

  // API 데이터를 순회하면서 카테고리 ID를 기준으로 그룹화합니다.
  data.items.forEach((item) => {
    const categoryId = item.category.id;
    if (!categoryDataMap[categoryId]) {
      categoryDataMap[categoryId] = [];
    }
    categoryDataMap[categoryId].push(item);
  });

  // PopularContainer를 가져옵니다.
  const PopularContainer = document.querySelector(".PopularContainer");

  // 그룹화된 데이터를 순회하면서 각 카테고리에 대한 섹션을 생성합니다.
  for (const categoryId in categoryDataMap) {
    const categoryItems = categoryDataMap[categoryId];

    // 카테고리에 대한 section을 생성합니다.
    const CategorySection = document.createElement("section");
    CategorySection.classList.add("Popular");

    // 카테고리 이름을 section에 추가합니다. (예: 'POPULAR POT')
    CategorySection.innerHTML = `
    <div class="Product_Tiitle">
      <div class="Eng_Title">POPULAR ${categoryItems[0].category.name}</div>
      <div class="KR_Title">이달의 신상품</div>
    </div>
  `;

    // Product_Col을 생성합니다.
    const ProductCol = document.createElement("div");
    ProductCol.classList.add("Product_Col");
    CategorySection.appendChild(ProductCol);

    // 각 카테고리에서 최대 3개의 아이템을 보여줍니다.
    for (let i = 0; i < Math.min(3, categoryItems.length); i++) {
      const Item = categoryItems[i];
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

      // hover했을 때 hover이미지가 나오도록 구현
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
  }
}
