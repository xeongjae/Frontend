const qs = new URLSearchParams(window.location.search);
const page = qs.get("page");
const URL = "/api";
const token =
  "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiVVNFUiIsInV1aWQiOiIxYWJjN2M1OS1lNDQ4LTQwMTMtOWFjMy1jZTk5OTU0MjIyYzAiLCJpYXQiOjE2OTcwODcyNDksImV4cCI6MTY5NzEzMDQ0OX0.Ek52tq_g6VVnwpb7IqibTw_wpEFGeY_jdzsLeTxzPZk; Path=/; HttpOnly;";

fetch(`http://localhost:3000${URL}/order?page=${page}`, {
  method: "GET",
  headers: {
    //Origin: `${URL}`, // 클라이언트의 도메인
    // 기타 헤더 설정
    "Content-Type": "application/json",
    Authorization: token,
  },
  credentials: "include", // credentials 옵션을 include로 설정
})
  .then((res) => {
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });

async function pagenation() {
  try {
    const totalPage = await Api.get("/api/orders");
    page_list.className = "";
    for (let i = 1; i <= totalPage.totalPage; i++) {
      const page = document.createElement("div");
      page.textContent = i;
      page.addEventListener("click", () => {
        listContainer.innerHTML = ``;
        makePageBold(i);
        makeOrderList(`${i}`);
      });
      page_list.appendChild(page);
    }
  } catch (err) {
    alert(err);
  }
}

// const order = `<tr>
// 	<td>${order_id}</td>
// 	<td>${name}</td>
// 	<td>${date}</td>
// 	<td>${total_price}</td>
// 	<td>${order_status}</td>
// </tr>`;
