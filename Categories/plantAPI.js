const ProductCol = document.querySelector(".Product_Col");

fetch("http://localhost:3000/categories/1/items", {
  method: "put",
  body: JSON.stringify({
    name: "세라믹",
    price: 39000,
    description: "아무노래나 일단 틀어",
    main_image: ["ii", "iii"],
  }),
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((res) => {
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  })
  .then((data) => {
    ItemCategory(data);
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });

function ItemCategory(data) {
  for (let i = 0; i <= data.item.length; i++) {
    let ItemInfo = data.item[i];
    console.log(ItemInfo.main_image);

    const Product = document.createElement("div");
    Product.innerHTML = `<div class="Product">
    <div class="Product_Img" style="background-image: url(${ItemInfo.main_image[0]}")></div>
    <div class="Product_Name">${ItemInfo.name}</div>
    <div class="Product_Price">${ItemInfo.price} 원</div>
  </div>;`;

    ProductCol.appendChild(Product);
  }
}
