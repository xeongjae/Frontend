import {
  login,
  logout,
  getUserInfo,
  deleteUser,
} from "../api-module/user-module.js";

const titleElement = document.createElement("h1");
const headBox = document.querySelector(".head-box");
const bodyBox = document.querySelector(".body-box");

login()
  .then((uuid) => {
    // UUID를 사용하여 사용자 정보 가져오기
    return getUserInfo(uuid);
  })
  .then((data) => {
    console.log(data);
    const titleText = `<h1 class="title-text">마이페이지 (${data.name} 님)</h1>`;
    headBox.insertAdjacentHTML("afterbegin", titleText);
  })
  .catch((error) => {
    console.error(error);
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

const userToken = localStorage.getItem("token");
if (userToken) {
  // 토큰이 있을 경우, 로그인한 사용자로 간주하고 다른 페이지로 리다이렉트
  document.querySelector(".logout-item").addEventListener("click", function () {
    const shouldLogOut = confirm("로그아웃 하시겠습니까?");

    if (shouldLogOut) {
      logout().catch((error) => {
        console.error(error);
      });
    }
  });
}

//회원 탈퇴 기능
document.querySelector(".account-item").addEventListener("click", function () {
  // 사용자에게 확인을 요청
  const shouldDelete = confirm("사용자를 삭제하시겠습니까?");

  if (shouldDelete) {
    deleteUser()
      .then(() => {
        // 삭제가 성공하면 토큰을 삭제하고 메인 페이지로 리다이렉트
        localStorage.removeItem("token");
        window.location.href = "/";
      })
      .catch((error) => {
        console.error(error);
      });
  }
});
