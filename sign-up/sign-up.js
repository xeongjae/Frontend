// 이메일 중복검사
document.querySelector('.id-duplicated-confilm-btn').addEventListener('click', function(e) {
  e.preventDefault();

  const email = document.querySelector('.emailInput').value;

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(email)) {
      return alert('올바른 이메일 형식을 입력하세요.');
  }

  const apiUrl = 'API 엔트포인트';
  
  fetch(apiUrl, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.isDuplicate) {
          return alert("이미 사용중인 이메일입니다.");
        } else {
          return alert("사용 가능한 이메일입니다.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        return alert("서버오류 발생, 다시 시도해 주세요");
      });
  });

//daum 주소찾기 API
document.querySelector('.find-address-btn').addEventListener('click', function() {
  new daum.Postcode({
    oncomplete: function(data) {
      let addr = '';
      let extraAddr = '';

      const address1Input = document.querySelector('.addressInput');
      const address2Input = document.querySelector('.detailAddressInput');
      

      if (data.userSelectedType === 'R') {
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

// 회원가입 처리
const signUpButton = document.querySelector('.sign-up-btn');

signUpButton.addEventListener("click", handleSignUp);

async function handleSignUp(e) {
  e.preventDefault();

  const email = document.querySelector('.emailInput').value;
  const password = document.querySelector('.passwordInput').value;
  const passwordConfirm = document.querySelector('.passwordConfirmInput').value;
  const name = document.querySelector('.nameInput').value;
  const phone = document.querySelector('.phoneInput').value;
  const address = document.querySelector('.addressInput').value;
  const detailAddress = document.querySelector('.detailAddressInput').value;

  if (!email) {
    return alert("이메일을 입력하세요.");
  }

  // 이메일 형식 검증
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(email)) {
    return alert("올바른 이메일 형식을 입력하세요.");
  }

  if (!password) {
    return alert("비밀번호를 입력하세요.");
  }

  if (!passwordConfirm) {
    return alert("비밀번호 확인을 입력하세요.");
  }

  // 비밀번호 일치 확인
  if (password !== passwordConfirm) {
    return alert("비밀번호 확인이 일치하지 않습니다.");
  }

  //비밀번호 형식 확인
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
  if (!passwordRegex.test(password)) {
    return alert(
      "비밀번호는 8자리 이상이며, 영어, 숫자, 특수문자를 포함해야 합니다."
    );
  }

  if (!phone) {
    return alert("전화번호를 입력하세요..");
  }
  //전화번호 형식 확인
  const phoneRegex = /^01[016789]-\d{3,4}-\d{4}$/;
  if (!phoneRegex.test(phone)) {
    return alert("올바른 전화번호 형식을 입력하세요. (ex: 010-1234-5678)");
  }

  if (!address) {
    return alert("주소를 입력하세요.");
  }

  const data = {
    email,
    password,
    name,
    phone,
    address,
    detailAddress,
  };

  const apiUrl = 'API 엔트포인트';
  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.status === 200) {
      alert("회원가입에 성공하였습니다!");
      window.location.href = "/login/login.html";
    } else {
      alert(responseData.message || '회원가입에 실패하였습니다');
    }
  } catch (error) {
    alert("네트워크 오류가 발생했습니다.");
    console.error(error);
  }
}
