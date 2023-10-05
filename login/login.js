// header.html을 header-container에 포함
fetch("../header_footer/header.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("header-container").innerHTML = data;
  });

// footer.html을 footer-container에 포함
fetch("../header_footer/footer.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("footer-container").innerHTML = data;
  });
