const EmailInput = document.querySelector(".email-input");
const PwInput = document.querySelector(".pw-input");
const PwCheckInput = document.querySelector(".pw-check-input");
const PhoneInput = document.querySelector(".phone-input");
const Address_1 = document.querySelector(".address-input-first");
const Address_2 = document.querySelector(".address-input-second");
const ModifyBtn = document.querySelector(".modify-btn");

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
        console.log(data);
        const UserInfo = data.data;
        // 사용자 정보를 처리하는 코드
        EmailInput.value = UserInfo.email;
        PhoneInput.value = UserInfo.phone;
        Address_1.value = UserInfo.address;
        Address_2.value = UserInfo.detail_address;
      })
      .catch((error) => {
        console.log(error);
      });
  })
  .catch((error) => {
    console.log(error);
  });

//주소 다음 API
document
  .querySelector(".find-address-button")
  .addEventListener("click", function () {
    new daum.Postcode({
      oncomplete: function (data) {
        let addr = "";
        let extraAddr = "";

        if (data.userSelectedType === "R") {
          addr = data.roadAddress;
        } else {
          addr = data.jibunAddress;
        }

        if (data.userSelectedType === "R") {
          if (data.bname !== "" && /[동|로|가]$/.test(data.bname)) {
            extraAddr += data.bname;
          }
          if (data.buildingName !== "" && data.apartment === "Y") {
            extraAddr +=
              extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
          }
          if (extraAddr !== "") {
            extraAddr = " (" + extraAddr + ")";
          }
        }

        Address_1.value = `${addr} ${extraAddr}`;
        Address_2.placeholder = "상세 주소를 입력해 주세요.";
        Address_2.focus();
      },
    }).open();
  });

PhoneInput.addEventListener("click", function () {
  this.value = "";
});

// input 이벤트 리스너를 추가합니다.
PhoneInput.addEventListener("input", function () {
  let phoneNumber = this.value.replace(/\D/g, "");
  if (phoneNumber.length >= 4 && phoneNumber.length <= 7) {
    phoneNumber = phoneNumber.slice(0, 3) + "-" + phoneNumber.slice(3);
  } else if (phoneNumber.length > 7) {
    phoneNumber =
      phoneNumber.slice(0, 3) +
      "-" +
      phoneNumber.slice(3, 7) +
      "-" +
      phoneNumber.slice(7, 11);
  }
  this.value = phoneNumber;
});

ModifyBtn.addEventListener("click", function (e) {
  if (PwInput.value !== PwCheckInput.value) {
    e.preventDefault();
    alert("비밀번호를 다시 확인해주세요");
  }
});

document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault(); // 폼 제출 기본 동작을 막습니다.

  // 사용자가 입력한 데이터 수집
  const phoneNumber = document.querySelector(".phone-input").value;
  const addressInputFirst = document.querySelector(
    ".address-input-first"
  ).value;
  const addressInputSecond = document.querySelector(
    ".address-input-second"
  ).value;

  // PATCH 요청을 위한 데이터 생성
  const userData = {
    phoneNumber: phoneNumber,
    address: addressInputFirst,
    detail_address: addressInputSecond,
  };

  // 첫 번째 fetch 요청 - 로그인
  fetch(`${URL}/login`, {
    method: "GET",
    headers: {
      Origin: `${URL}`,
      // 기타 헤더 설정
    },
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => {
      const uuid = data.data.uuid;

      // 두 번째 fetch 요청
      fetch(`${URL}/users/${uuid}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Origin: `${URL}`,
        },
        credentials: "include",
        body: JSON.stringify(userData),
      })
        .then((response) => {
          if (response.ok) {
            console.log("사용자 정보 업데이트 성공");
          } else {
            console.error("사용자 정보 업데이트 실패");
          }
        })
        .catch((error) => {
          console.error("오류 발생: ", error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
});
