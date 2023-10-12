const titleElement = document.createElement("h1");
const headBox = document.querySelector(".head-box");
const bodyBox = document.querySelector(".body-box");

const URL = "/api";
// 첫 번째 fetch 요청 - 로그인
fetch(`${URL}/login`, {
  method: "GET",
  headers: {
    Origin: `${URL}`,
    // 기타 헤더 설정
  },
  credentials: "include",
})
  .then((response) => response.json()) // JSON 형식의 응답을 파싱
  .then((data) => {
    console.log(data);
    const uuid = data.data.uuid; // 로그인 후 반환된 UUID

    // 두 번째 fetch 요청 - 사용자 정보 가져오기
    fetch(`${URL}/users/${uuid}`, {
      method: "GET",
      headers: {
        Origin: `${URL}`,
        // 기타 헤더 설정
      },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const titleText = `<h1 class="title-text">마이페이지 (${data.data.name} 님)</h1>`;
        headBox.insertAdjacentHTML("afterbegin", titleText);
      })
      .catch((error) => {
        console.log(error);
      });
  })
  .catch((error) => {
    console.log(error);
  });

// 메뉴 항목 생성
const menuItems = [
  { text: "정보 수정", class: "info-item" },
  { text: "주문 내역", class: "order-item" },
  { text: "로그아웃", class: "logout-item" },
  { text: "회원 탈퇴", class: "account-item" },
];

const ulElement = document.createElement("ul");

menuItems.forEach((menuItem) => {
  const liElement = document.createElement("li");
  liElement.innerHTML = menuItem.text;
  liElement.classList.add(menuItem.class); // 해당 클래스 추가
  ulElement.appendChild(liElement);

  if (menuItem.class === "info-item") {
    liElement.addEventListener("click", () => {
      // 주문 내역 페이지로 이동
      window.location.href = "mypage.html";
    });
  } else if (menuItem.class === "order-item") {
    liElement.addEventListener("click", () => {
      // 주문 내역 페이지로 이동
      window.location.href = "mypage-order.html";
    });
  }
});

// head-box와 body-box에 추가 (첫 번째 자식으로)
headBox.insertBefore(titleElement, headBox.firstChild);
bodyBox.insertBefore(ulElement, bodyBox.firstChild);

//로그아웃 기능
function getCookie(name) {
  const cookies = document.cookie.split(";");
  const foundCookie = cookies.find((cookie) =>
    cookie.trim().startsWith(name + "=")
  );

  if (foundCookie) {
    return foundCookie.split("=")[1].trim();
  }

  return null; // 해당 쿠키 이름을 찾지 못한 경우 null 반환
}

const userToken = getCookie("token");
if (userToken) {
  // 토큰이 있을 경우, 로그인한 사용자로 간주하고 다른 페이지로 리다이렉트
  document.querySelector(".logout-item").addEventListener("click", function () {
    const shouldLogOut = confirm("로그아웃 하시겠습니까?");

    if (shouldLogOut) {
      fetch(`${URL}/logout`, {
        method: "POST",
        headers: {
          Origin: `${URL}`, // 클라이언트의 도메인
          // 기타 헤더 설정
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
          console.log("사용자 삭제 성공");
          window.location.href = "/";
        })
        .catch((error) => {
          console.error("사용자 삭제 오류:", error);
        });
    }
  });
}

//회원 탈퇴 기능
document.querySelector(".account-item").addEventListener("click", function () {
  // 사용자에게 확인을 요청
  const shouldDelete = confirm("사용자를 삭제하시겠습니까?");

  if (shouldDelete) {
    // 첫 번째 fetch 요청 - 로그인
    fetch(`${URL}/login`, {
      method: "GET",
      headers: {
        Origin: `${URL}`,
        // 기타 헤더 설정
      },
      credentials: "include",
    })
      .then((response) => response.json()) // JSON 형식의 응답을 파싱
      .then((data) => {
        console.log(data);
        const uuid = data.data.uuid; // 로그인 후 반환된 UUID

        // 두 번째 fetch 요청 - 사용자 정보 가져오기
        fetch(`${URL}/users/${uuid}`, {
          method: "DELETE",
          headers: {
            Origin: `${URL}`, // 클라이언트의 도메인
            // 기타 헤더 설정
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
            // DELETE 요청이 성공했을 때 수행할 작업을 여기에 추가
            console.log("사용자 삭제 성공");
            window.location.href = "/";
          })
          .catch((error) => {
            console.error("사용자 삭제 오류:", error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }
});
