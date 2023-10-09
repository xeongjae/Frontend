const customHeader = document.querySelector(".header-container");

// 헤더 UI 생성 함수
function createHeader(data) {
  // data.categories 배열을 순회하면서 카테고리 추가
  const headerContainer = document.createElement("header");

  headerContainer.innerHTML = `
    <div class="Header">
      <a href="/main/index.html">
        <h1 class="Title"></h1>
      </a>
      <div class="Header_Row">
        <div class="Middle_Container">
          <div class="categories">
          </div>
        </div>
        <div class="User">
          <a class="far fa-user" href="/mypage/mypage.html"></a>
          <a class="fas fa-shopping-bag" href="/cart/cart.html"></a>
          <a class="fas fa-search"></a>
        </div>
      </div>
    </div>
  `;

  // customHeader에 헤더 UI를 삽입
  customHeader.appendChild(headerContainer);

  // 카테고리 추가 작업을 위한 CategoriesContainer 찾기
  const CategoriesContainer = document.querySelector(".categories");

  // data.categories 배열을 순회하면서 각 카테고리를 추가
  for (let i = 0; i < data.categories.length; i++) {
    const category = data.categories[i];
    const categoryLink = document.createElement("a");
    categoryLink.href = `/categories/category.html?category=${category.id}`;
    categoryLink.onclick = function (event) {
      sessionStorage.setItem("selectedValue", category.id); //sessionStorage에 가게고유의 adminNo값 저장
      window.location.href = `/categories/category.html?category=${category.id}`;
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
        <li>박진수</li>
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
  const URL = "http://kdt-sw-6-team08.elicecoding.com";

  // 카테고리 목록을 가져오는 요청을 보냅니다.
  fetch(`${URL}/categories`)
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
});
