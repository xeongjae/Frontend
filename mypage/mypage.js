function searchAddress() {
  const query = document.getElementById("addressInput").value;
  const resultDiv = document.getElementById("result");

  if (!query.trim()) {
    alert("주소를 입력해주세요.");
    return;
  }

  new daum.Postcode({
    oncomplete: function (data) {
      resultDiv.innerHTML = "";
      for (let i = 0; i < data.addresses.length; i++) {
        resultDiv.innerHTML += `<p>${data.addresses[i].address}</p>`;
      }
    },
  }).search(query);
}
document.addEventListener("DOMContentLoaded", function () {
  populateYears();
  populateMonths();
  populateDays();
});

function populateYears() {
  const yearSelect = document.getElementById("year");
  const currentYear = new Date().getFullYear();

  for (let i = currentYear; i >= 1900; i--) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    yearSelect.appendChild(option);
  }
}

function populateMonths() {
  const monthSelect = document.getElementById("month");
  const months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];

  months.forEach((month) => {
    const option = document.createElement("option");
    option.value = month;
    option.textContent = month;
    monthSelect.appendChild(option);
  });
}

function populateDays() {
  const daySelect = document.getElementById("day");
  const year = parseInt(document.getElementById("year").value);
  const month = parseInt(document.getElementById("month").value);

  // 해당 월의 마지막 일자를 얻기 위한 로직
  const lastDay = new Date(year, month, 0).getDate();

  // 일(day) 셀렉트 박스 초기화
  daySelect.innerHTML = "";

  for (let i = 1; i <= lastDay; i++) {
    const option = document.createElement("option");
    option.value = i < 10 ? "0" + i : i;
    option.textContent = i < 10 ? "0" + i : i;
    daySelect.appendChild(option);
  }
}
function showSelectedGender() {
  const selectedGender = document.querySelector(
    'input[name="gender"]:checked'
  ).value;
  alert(`선택된 성별: ${selectedGender === "male" ? "남성" : "여성"}`);
}
