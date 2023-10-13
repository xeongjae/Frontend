// 정보 수정 함수 정의
const URL = "/api";
const token = localStorage.getItem("token"); // 토큰 가져오기

//로그인 uuid를 가져오는 모듈
export function login() {
  return fetch(`${URL}/login`, {
    method: "GET",
    headers: {
      Origin: `${URL}`,
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    credentials: "include",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => data.data.uuid)
    .catch((error) => {
      throw error;
    });
}

//uuid를 사용해서 유저 정보를 가져오는 모듈
export function getUserInfo(uuid) {
  return fetch(`${URL}/users/${uuid}`, {
    method: "GET",
    headers: {
      Origin: `${URL}`,
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    credentials: "include",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => data.data)
    .catch((error) => {
      throw error;
    });
}

//사용자 정보 수정 모듈
export function updateUserInfo(userData, successCallback, errorCallback) {
  // 첫 번째 fetch 요청 - 로그인
  fetch(`${URL}/login`, {
    method: "GET",
    headers: {
      Origin: `${URL}`,
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
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
          Origin: `${URL}`,
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        credentials: "include",
        body: JSON.stringify(userData),
      })
        .then((response) => {
          if (response.ok) {
            successCallback("사용자 정보 업데이트 성공");
          } else {
            errorCallback("사용자 정보 업데이트 실패");
          }
        })
        .catch((error) => {
          console.error("오류 발생: ", error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
}

//로그아웃 모듈
export function logout() {
  return fetch(`${URL}/logout`, {
    method: "POST",
    headers: {
      Origin: `${URL}`,
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
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
      localStorage.removeItem("token");
      window.location.href = "/";
    })
    .catch((error) => {
      console.error("사용자 삭제 오류:", error);
    });
}

export function deleteUser() {
  return login()
    .then((uuid) => {
      return fetch(`${URL}/users/${uuid}`, {
        method: "DELETE",
        headers: {
          Origin: `${URL}`,
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        credentials: "include",
      });
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(() => {
      localStorage.removeItem("token");
      console.log("사용자 삭제 성공");
      window.location.href = "/";
    })
    .catch((error) => {
      console.error("사용자 삭제 오류:", error);
    });
}
