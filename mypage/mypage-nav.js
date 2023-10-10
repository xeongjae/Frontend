const URL = "http://kdt-sw-6-team08.elicecoding.com";
const titleElement = document.createElement("h1");

// 쿠키에서 토큰을 가져오는 함수
function getTokenFromCookie() {
  const cookieName = "token"; // 쿠키 이름
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(cookieName + "=")) {
      return cookie.substring(cookieName.length + 1);
    }
  }
  return null; // 쿠키에서 토큰을 찾지 못한 경우
}

// 쿠키에서 토큰을 가져옵니다.
const token = getTokenFromCookie();

if (token) {
  // 토큰이 있는 경우, 서버에 요청을 보내서 로그인 정보를 가져옵니다.
  fetch(`${URL}/users/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`, // 토큰을 헤더에 추가
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("서버에서 로그인 정보를 가져오지 못했습니다.");
      }
    })
    .then((data) => {
      // 서버에서 반환된 로그인 정보를 data 변수에 저장
      console.log("로그인 정보:", data);
      // 여기에 로그인 정보를 사용하는 로직을 추가하세요.
    })
    .catch((error) => {
      console.error("로그인 정보를 가져오지 못했습니다.", error);
    });
} else {
  console.log(
    "토큰이 없습니다. 로그인되지 않았거나 토큰이 만료되었을 수 있습니다."
  );
  // 토큰이 없는 경우 처리할 로직을 추가하세요.
}

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
