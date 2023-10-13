import { URL, TOKEN } from "./module-setting.js";

//로그인 했을 때 uuid값 가져오는 모듈
export function login() {
  return fetch(`${URL}/login`, {
    method: "GET",
    headers: {
      Origin: `${URL}`,
      "Content-Type": "application/json",
      Authorization: "Bearer " + TOKEN,
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

//uuid를 이용해서 유저에 데이터를 가져오는 모듈
export function getUserInfo(uuid) {
  return fetch(`${URL}/users/${uuid}`, {
    method: "GET",
    headers: {
      Origin: `${URL}`,
      "Content-Type": "application/json",
      Authorization: "Bearer " + TOKEN,
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

//유저 정보 수정 하는 모듈
export function updateUserInfo(userData) {
  return login()
    .then((uuid) => {
      return fetch(`${URL}/users/${uuid}`, {
        method: "PATCH",
        headers: {
          Origin: `${URL}`,
          "Content-Type": "application/json",
          Authorization: "Bearer " + TOKEN,
        },
        credentials: "include",
        body: JSON.stringify(userData),
      });
    })
    .then((response) => {
      if (response.ok) {
        return "사용자 정보 업데이트 성공";
      } else {
        throw new Error("사용자 정보 업데이트 실패");
      }
    })
    .catch((error) => {
      throw error;
    });
}

//로그 아웃 하면서 token을 삭제하고 메인으로 이동하는 모듈
export function logout() {
  return fetch(`${URL}/logout`, {
    method: "POST",
    headers: {
      Origin: `${URL}`,
      "Content-Type": "application/json",
      Authorization: "Bearer " + TOKEN,
    },
    credentials: "include",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(() => {
      localStorage.removeItem("token");
      window.location.href = "/";
    })
    .catch((error) => {
      throw error;
    });
}

//유저 삭제하는 모듈
export function deleteUser() {
  return login()
    .then((uuid) => {
      return fetch(`${URL}/users/${uuid}`, {
        method: "DELETE",
        headers: {
          Origin: `${URL}`,
          "Content-Type": "application/json",
          Authorization: "Bearer " + TOKEN,
        },
        credentials: "include",
      });
    })
    .then((response) => {
      if (response.ok) {
        return "사용자 삭제 성공";
      } else {
        throw new Error("사용자 삭제 실패");
      }
    })
    .catch((error) => {
      throw error;
    });
}
