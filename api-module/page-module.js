import { URL, TOKEN } from "./module-setting.js";

//categories값 가져오기
export function getcategories() {
  return fetch(`${URL}/categories`, {
    method: "GET",
    headers: {
      Origin: `${URL}`, // 클라이언트의 도메인
      "Content-Type": "application/json",
      Authorization: "Bearer " + TOKEN,
    },
    credentials: "include", // credentials 옵션을 include로 설정
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .catch((error) => {
      console.log(error);
    });
}
