const EmailInput = document.querySelector(".email-input");
const PwInput = document.querySelector(".pw-input");
const PwCheckInput = document.querySelector(".pw-check-input");
const PhoneInput = document.querySelector(".phone-input");
const Address_1 = document.querySelector(".address-input-first");
const Address_2 = document.querySelector(".address-input-second");
const ModifyBtn = document.querySelector(".modify-btn");

fetch("/api/api.json")
  .then((res) => {
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  })
  .then((data) => {
    console.log(data);
    EmailInput.value = data.user[0].email;
    PhoneInput.value = data.user[0].data.phone;
    Address_1.value = data.user[0].data.address;
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
