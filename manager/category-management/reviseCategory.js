async function reviseHandler(e) {
  e.preventDefault();

  const url = "/api";
  try {
    const id = document.querySelector(".id").textContent;
    const name = document.getElementById("input-value").value;

    const res = await fetch(`${url}/categories/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: {
          id,
          name,
        },
      }),
    });

    const resData = await res.json();

    if (resData.message !== "success") {
      alert(`에러 메세지 : ${resData.message}, 에러 코드 : ${resData.status}`);
    }

    location.reload();
  } catch (error) {
    console.log("error message:", error);
    alert("서버 오류 발생!");
  }
}
