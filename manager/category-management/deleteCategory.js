// 삭제 버튼을 클릭할 때의 동작을 정의합니다.
document.addEventListener("click", function(event) {
  // 클릭된 요소가 삭제 버튼인지 확인합니다.
  if (event.target.classList.contains("button-delete")) {
    // 삭제 버튼의 data-id 속성을 가져옵니다.
    const dataId = event.target.getAttribute("data-id");

    // 해당 data-id 값을 가지는 item-box 요소를 찾습니다.
    const itemBox = document.querySelector(`.item-box[data-id="${dataId}"]`);

    // item-box를 찾았을 경우, 삭제합니다.
    if (itemBox) {
      itemBox.remove();
    }
  }
});
