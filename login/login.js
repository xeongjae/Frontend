//회원 비회원 선택
document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".member").addEventListener("click", function () {
    document.querySelector(".member-form-container").style.display = "block";
    document.querySelector(".guest-form-container").style.display = "none";
    document.querySelector(".member").classList.add("method-select-click");
    document.querySelector(".guest").classList.remove("method-select-click");
  });

  document.querySelector(".guest").addEventListener("click", function () {
    document.querySelector(".guest-form-container").style.display = "block";
    document.querySelector(".member-form-container").style.display = "none";
    document.querySelector(".member").classList.remove("method-select-click");
    document.querySelector(".guest").classList.add("method-select-click");
  });
});
//로그인기능
document
  .querySelector(".login-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.querySelector(".emailInput").value;
    const password = document.querySelector(".passwordInput").value;

    if (!email) {
      return alert("email을 입력하세요.");
    }
    // 이메일 형식 검증
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      return alert("올바른 이메일 형식을 입력하세요.");
    }
    if (!password) {
      return alert("비밀번호를 입력하세요.");
    }

    //서버에 보낼 데이터
    const data = {
      email,
      password,
    };

    //로그인 요청 (Fetch API)
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("access_token"),
        },
        body: JSON.stringify(data),
      });

      const resData = await res.json();
      if (resData.status === 200) {
        //localStorage.setItem("token", resData.token);
        window.location.href = "/";
      } else {
        alert(resData.message || "로그인 정보를 확인하세요");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("서버 오류 발생");
    }
  });
