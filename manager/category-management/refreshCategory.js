document.addEventListener("DOMContentLoaded", async function (e) {
  const categoryCard = document.querySelector(".category-card");
  const url = "/api";

  try {
    const res = await fetch(`${url}/categories`);
    const data = await res.json();

    const categoryDataArray = data.categories;


    categoryDataArray.forEach((obj) => {
      const categoryId = obj.id;

      const categoryName = obj.name;

      const itemBoxEl = document.createElement("div");
      itemBoxEl.setAttribute("class", "item-box");
      itemBoxEl.setAttribute("data-id", `${categoryId}`);

      const itemForm = `
    <p class="item-name">${categoryName}</p>
  `;

      itemBoxEl.innerHTML = itemForm;
      categoryCard.appendChild(itemBoxEl);
    });
  } catch (error) {
    alert("데이터를 불러오지 못했습니다.");
  }
});
