document
  .querySelector(".find-address-button button is-rounded")
  .addEventListener("click", function () {
    new daum.Postcode({
      oncomplete: function (data) {
        let addr = "";
        let extraAddr = "";

        const address1Input = document.getElementById("addressInput");
        const address2Input = document.getElementById("detailAddressInput");

        if (data.userSelectedType === "R") {
          addr = data.roadAddress;
        } else {
          addr = data.jibunAddress;
        }

        if (data.userSelectedType === "R") {
          if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
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

        address1Input.value = `${addr} ${extraAddr}`;
        address2Input.placeholder = "상세 주소를 입력해 주세요.";
        address2Input.focus();
      },
    }).open();
  });
