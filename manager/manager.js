//이메일, 비번, 버튼
const inputEmail = document.getElementById("input-email");
const inputPassword = document.getElementById("input-password");
const submitForm = document.getElementById("form");
const buttonSubmit = document.getElementById("button-submit");
const url = "/api";

//const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

async function submitHandler(e) {
  e.preventDefault();
  const email = inputEmail.value;
  const password = inputPassword.value;

  try {
    const res = await fetch(`${url}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const resData = await res.json();

    console.log(resData);
    if (resData.status === 200) {
      window.location.href = "/manager/category-management/category.html";

    } else {
      alert(resData.message || "로그인 정보를 확인하세요!");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("서버 오류 발생");
  }
}

//click

buttonSubmit.addEventListener("click", submitHandler);
