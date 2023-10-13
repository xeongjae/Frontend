document.addEventListener("DOMContentLoaded", function () {
  const card = document.querySelector(".in-container");
  const inputCategory = document.querySelector("#input-value");
  const id = document.querySelector(".id");

  function descriptInpo(event) {
    const clickedItemBox = event.target;

    const itemName = clickedItemBox.querySelector(".item-name").textContent;
    const itemId = clickedItemBox.getAttribute("data-id");
    inputCategory.value = itemName;
    id.innerHTML = itemId;
  }

  card.addEventListener("click", descriptInpo);
});
