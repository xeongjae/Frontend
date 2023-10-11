document.addEventListener("DOMContentLoaded", function () {
  const btnDescriptions = document.querySelectorAll("#item-box");
  const btnDeletes = document.querySelector(".button-delete-item");

  const inputName = document.querySelector("#input-name");
  const inputId = document.querySelector("#input-id");
  const inputPrice = document.querySelector("#input-price");
  const inputColor = document.querySelector("#input-color");
  const optionCategory = document.querySelector(".input-category-amend");
  

  function descriptInpo (event) {
    const clickedItemBox = event.currentTarget;

    const itemName = clickedItemBox.querySelector(".item-name").textContent;
    const itemId = clickedItemBox.querySelector(".item-id").textContent;
    const itemPrice = clickedItemBox.querySelector(".item-price").textContent;

    inputName.value = itemName;
    inputId.value = itemId;
    inputPrice.value = itemPrice;

    console.log("상세정보")
  }

  function deleteItemBox () {
    const inputedId = inputId.value;
    console.log(`이건 ${inputedId}`)

    btnDescriptions.forEach((btn) => {
      const id = btn.getAttribute("data-id");

      if (id === inputedId) {
        btn.remove()
      }

      console.log(id)
    })
    console.log("삭제")
  }


  btnDescriptions.forEach((btn) => {
    btn.addEventListener("click", descriptInpo)
  })

  btnDeletes.addEventListener("click", deleteItemBox)


});
