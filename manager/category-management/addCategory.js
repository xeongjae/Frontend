const formSubmit = document.getElementById("form");
const categoryCard = document.querySelector(".category-card");
const btnsDelete = document.querySelectorAll(".button-delete");
const itemBoxs = document.querySelectorAll(".item-box p");



function submitHandler(e) {
  e.preventDefault();

  itemBoxs.forEach((box) => {
    const text = box.innerHTML;

    console.log(text);
  })


  const itemEl = document.createElement("div");
  const inputedCategory = document.getElementById("input-value").value;

  itemEl.setAttribute("class", "item-box");
  itemEl.setAttribute("data-id", inputedCategory);



  const itemForm = `
    <p>${inputedCategory}</p>
    <button class="button-delete" data-id="${inputedCategory}">삭제</button>
  `

  if (inputedCategory.length !== 0) {
    itemEl.innerHTML = itemForm;
  } else {return;};

  categoryCard.prepend(itemEl);


}




formSubmit.addEventListener("submit", submitHandler);

