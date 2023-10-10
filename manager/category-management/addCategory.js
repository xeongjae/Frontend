const formSubmit = document.getElementById("form");
const categoryCard = document.querySelector(".category-card");
const btnsDelete = document.querySelectorAll(".button-delete");



function submitHandler(e) {
  e.preventDefault();



  const itemEl = document.createElement("div");
  const inputedCategory = document.getElementById("input-value").value;

  itemEl.setAttribute("class", "item-box");
  itemEl.setAttribute("data-id", inputedCategory);




  const itemForm = `
    <p>${inputedCategory}</p>
    <button class="button-delete" data-id="${inputedCategory}">삭제</button>
  `

  if (inputedCategory.length !== 0) {
    console.log("GG")
    itemEl.innerHTML = itemForm;
  } else {return;};

  categoryCard.prepend(itemEl);

  console.log(inputedCategory)
  console.log("제출");


}




formSubmit.addEventListener("submit", submitHandler);

