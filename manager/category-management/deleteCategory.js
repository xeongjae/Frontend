const btnDelete = document.getElementById("btn-delete");

async function deleteHandler() {
  try {
    const id = document.querySelector(".id").textContent;

    const res = await fetch(`/api/categories/${id}`, {
      method: "DELETE",
    });

    location.reload();

    if (id === null) {
      alert("카테고리를 선택하세요!");
    } else if (res.status === 401) {
      const data = await res.json();
      alert(`오류 메시지: ${data.message}, 상태 코드: ${res.status}`);
    }
  } catch (error) {
    console.log("Error:", error);
    alert("서버 오류 발생");
  }
}

btnDelete.addEventListener("click", deleteHandler);
