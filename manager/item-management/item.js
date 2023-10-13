const qs = new URLSearchParams(window.location.search);
const categoryId = qs.get("category");
const page = qs.get("page");
const itemTable = document.querySelector("#item-table tbody");
const pagination = document.querySelector("#pagination div");

const createDiv = document.querySelector("#create-div");
const createFormBox = document.querySelector("#create-form-box");
const inputName = document.querySelector("#input-name");
const inputPrice = document.querySelector("#input-price");
const inputDescription = document.querySelector("#input-description");
const inputCategory = document.querySelector("#input-category");
const submitBtn = document.querySelector("#button-submit");
const deleteBtn = document.querySelector("#button-delete");
let updateId = false;

async function item() {
  // 상품리스트 가져오기
  const res = await fetch(`/api/categories/${categoryId}/items?&page=${page}`);
  if (!res.ok) {
    console.log(res);
  }
  const data = await res.json();
  const items = data.items;
  items.map((item, idx) => {
    itemTable.innerHTML += `
    <tr id="item-${idx}">
      <td>${item.id}</td>
      <td>${item.name}</td>
      <td>${item.price}</td>
    </tr>
    `;
  });
  for (let i = 1; i <= Number(data.totalPage); i++) {
    pagination.innerHTML += `<a href="?category=${categoryId}&page=${i}">${i}</a>`;
  }

  itemTable.addEventListener("click", function (e) {
    e.preventDefault();
    const idx = e.target.parentElement.id.replace("item-", "");
    const item = items[idx];
    updateId = item.id;
    inputName.value = item.name;
    inputPrice.value = item.price;
    inputDescription.value = item.description;

    createDiv.innerHTML = "상품 수정";

    for (let i = 0; i < items.length; i++) {
      const tr = document.querySelector(`#item-${i}`);
      tr.classList.remove("select-item");
    }
    e.target.parentElement.classList.add("select-item");
    submitBtn.innerHTML = "수정";
    deleteBtn.innerHTML = "삭제";
  });
}

item();

createFormBox.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(createFormBox);
  if (formData.getAll("main_images").length > 2) {
    return alert("대표 사진은 최대 2개까지 업로드 가능합니다. ");
  }

  if (!updateId) {
    const res = await fetch(`/api/categories/${inputCategory.value}/items`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: formData,
    });
    const data = await res.json();
    if (res.ok) {
      alert("상품이 등록되었습니다. ", data.item.name);
      location.href = `?category=${categoryId}&page=${page}`;
    } else {
      alert(`상품 등록에 실패하였습니다. error : ${data.message}`);
    }
  } else {
    const res = await fetch(
      `/api/categories/${inputCategory.value}/items/${updateId}`,
      {
        method: "PUT",
        body: formData,
      }
    );
    const data = await res.json();
    if (res.ok) {
      alert("상품이 수정되었습니다. ", data.item.name);
      location.href = `?category=${categoryId}&page=${page}`;
    } else {
      alert(`상품 수정에 실패하였습니다. error : ${data.message}`);
    }
  }
});

createFormBox.addEventListener("reset", async (e) => {
  if (updateId) {
    e.preventDefault();
    if (confirm(`상품을 삭제할까요?`)) {
      const res = await fetch(
        `/api/categories/${inputCategory.value}/items/${updateId}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        alert("상품이 삭제되었습니다.");
      } else {
        alert(`상품 삭제에 실패하였습니다. error : ${data.message}`);
      }
    }
    location.href = `?category=${categoryId}&page=${page}`;
  }
});
