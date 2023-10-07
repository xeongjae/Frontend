// 헤더 UI 생성 함수
function createHeader() {
  const headerContainer = document.createElement("header");
  headerContainer.innerHTML = `
    <div class="Header">
      <a href="../main/index.html">
        <h1 class="Title"></h1>
      </a>
      <div class="Header_Row">
        <div class="Middle_Container">
          <div class="categories">
            <a href="/categories/plant.html">PLANT</a>
            <a href="/categories/pot.html">POT</a>
            <a href="/categories/gardening-tools.html">GARDENING TOOLS</a>
            <a href="/categories/gardening-kit.html">GARDENING KIT</a>
          </div>
        </div>
        <div class="User">
          <a class="far fa-user"></a>
          <a class="fas fa-shopping-bag" href="/cart/cart.html"></a>
          <a class="fas fa-search"></a>
        </div>
      </div>
    </div>
    `;

  // customHeader에 헤더 UI를 삽입
  const customHeader = document.querySelector(".header-container");
  customHeader.appendChild(headerContainer);
}
// createHeader 호출
createHeader();

function createFooter() {
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

// createFooter 함수 호출
createFooter();
