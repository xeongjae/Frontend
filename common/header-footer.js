import { login, getUserInfo } from "../api-module/user-module.js";
import { getcategories } from "../api-module/page-module.js";

const customHeader = document.querySelector(".header-container");

// 헤더 UI 생성 함수
function createHeader(data) {
  // data.categories 배열을 아이디 순으로 정렬
  data.categories.sort((a, b) => a.id - b.id);

  const headerContainer = document.createElement("header");

  headerContainer.innerHTML = `
    <div class="Header">
      <a href="/">
        <h1 class="Title"></h1>
      </a>
      <div class="Header_Row">
        <div class="Middle_Container">
          <div class="categories">
          </div>
        </div>
        <div class="User">
          <a class="far fa-user"></a>
          <a class="fas fa-shopping-bag" href="/cart"></a>
          <a class="fas fa-user-tie" style="display: none;" href="/manager"></a>
        </div>
      </div>
    </div>
  `;
  //로그인 했을 때 관리자면 관리자 버튼이 활성화 되도록 로그인 api를 가져 옴
  login()
    .then((uuid) => {
      // UUID를 사용하여 사용자 정보 가져오기
      return getUserInfo(uuid);
    })
    .then((data) => {
      console.log(data);
      if (data.role === "ADMIN") {
        document.querySelector(".fa-user-tie").style.display = "block";
      }
    })
    .catch((error) => {
      console.error(error);
    });
  const UserBtn = headerContainer.querySelector(".fa-user");

  function getTokenFromsessionStorage() {
    const userToken = sessionStorage.getItem("token");
    return userToken;
  }

  const userToken = getTokenFromsessionStorage();

  if (userToken) {
    console.log("토큰이 있습니다.");
    UserBtn.onclick = function (event) {
      window.location.href = "/mypage/";
    };
  } else {
    console.log("토큰이 없습니다.");
    UserBtn.onclick = function (event) {
      window.location.href = "/login/";
    };
  }

  customHeader.appendChild(headerContainer);
  const CategoriesContainer = document.querySelector(".categories");

  // data.categories 배열을 순회하면서 각 카테고리를 추가
  for (let i = 0; i < data.categories.length; i++) {
    const category = data.categories[i];
    const categoryLink = document.createElement("a");
    categoryLink.href = `/categories?category=${category.id}`;
    categoryLink.onclick = function (event) {
      window.location.href = `/categories?category=${category.id}`;
    };
    categoryLink.textContent = category.name;
    CategoriesContainer.appendChild(categoryLink);
  }
}

function createFooter(data) {
  const footerContainer = document.createElement("footer");
  footerContainer.innerHTML = `
    <div class="Footer_Container">
      <ul class="Producer">
        <li style="margin: 0px;">이진이</li>
        <li>김영준</li>
        <li>김성재</li>
        <li>박준석</li>
        <li>이유진</li>
        <li>조승준</li>
      </ul>
      <div class="Company_Info">
        <p>
          상호: Casa Verde | 대표: 이진이 | 전화: 070-4633-2740 | 이메일:
          jsj487@naver.com
        </p>
      </div>
      <div class="Company_Second_Info">
        <p>
          주소: 서울 성동구 아차산로17길 48 성수낙낙 2층 | 호스팅 제공자: Elice
        </p>
      </div>
    </div>
  `;

  // customfooter에 헤더 UI를 삽입
  const customfooter = document.querySelector(".footer-container");
  customfooter.appendChild(footerContainer);
}

// DOMContentLoaded 이벤트 리스너를 이동
document.addEventListener("DOMContentLoaded", function () {
  // 카테고리 목록을 가져오는 요청을 보냅니다.
  getcategories()
    .then((data) => {
      createHeader(data);
      createFooter(data);
    })
    .catch((error) => {
      console.log(error);
    });
});
