fetch("/api/api.json")
  //   `${SERVER_URI}/categories/`, {
  //   method: "get",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(data),
  // })
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
  data.categories.forEach((category) => {
    for (let i = 0; i < 3 && i < category.item.length; i++) {
      const Item = category.item[i];
      const Product = document.createElement("div");
      Product.innerHTML = `
        <div class="New_Product">
          <div class="Product_Img">
            <img src="${Item.main_image[0]}" alt="" />
          </div>
          <div class="Product_Name">${Item.name}</div>
          <div class="Product_Price">${Item.price}</div>
        </div>
      `;

      if (category.id === 1) {
        Product_Contain[0].appendChild(Product);
      } else if (category.id === 2) {
        Product_Contain[1].appendChild(Product);
      } else if (category.id === 3) {
        Product_Contain[2].appendChild(Product);
      } else if (category.id === 4) {
        Product_Contain[3].appendChild(Product);
      }

      //hover했을 때 hover이미지가 나오도록 구현
      const ProductImg = Product.querySelector(".Product_Img img");
      ProductImg.addEventListener("mouseenter", function () {
        ProductImg.src = `${Item.main_image[1]}`;
      });
      ProductImg.addEventListener("mouseleave", function () {
        ProductImg.src = `${Item.main_image[0]}`;
      });
    }
  });
}
