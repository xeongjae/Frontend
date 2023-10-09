const URL = "http://kdt-sw-6-team08.elicecoding.com";

// 카테고리 목록을 가져오는 요청을 보냅니다.
fetch(`${URL}/user`)
  .then((res) => {
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  })
  .then((data) => {
    createHeader(data);
    createFooter(data);
  })
  .catch((error) => {
    console.log(error);
  });

// 페이지 제목 생성
const pageTitle = "마이페이지 (조승준 님)";
const titleElement = document.createElement("h1");
titleElement.innerHTML = pageTitle;
titleElement.classList.add("title-text"); // title-text 클래스 추가

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
const headBox = document.querySelector(".head-box");
const bodyBox = document.querySelector(".body-box");

headBox.insertBefore(titleElement, headBox.firstChild);
bodyBox.insertBefore(ulElement, bodyBox.firstChild);
