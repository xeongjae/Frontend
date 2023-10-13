const addBtn = document.getElementById("btn-submit");
const categoryCard = document.querySelector(".category-card");
const inputCategory = document.getElementById("input-value");

// 추가 함수
async function addHandler(e) {
  e.preventDefault();
  const name = inputCategory.value;
  const url = "/api";

  let olderId = document.querySelectorAll(".item-box").length;

  let id = ++olderId;
  try {
    const res = await fetch(`${url}/categories`, {
      method: "POST",
      headers: {
        Origin: `${url}`, // 클라이언트의 도메인
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify({
        data: {
          id,
          name,
        },
      }),
    });
    const resData = await res.json();

    if (resData.message === "success") {
      //item-box
      const itemEl = document.createElement("div");

      itemEl.setAttribute("class", "item-box");
      itemEl.setAttribute("data-id", resData.category.id);

      const itemForm = `
    <p>${resData.category.name}</p>
  `;

      if (inputCategory.length !== 0) {
        itemEl.innerHTML = itemForm;
      } else {
        alert("입력란을 채워주세요!");
      }

      categoryCard.prepend(itemEl);
    } else {
      console.log("reflection 실패!");
    }

    location.reload();
  } catch (error) {
    console.log("error Message:", error);
    location.reload();
    // alert("서버 오류 발생!");
  }
}

addBtn.addEventListener("click", addHandler);
