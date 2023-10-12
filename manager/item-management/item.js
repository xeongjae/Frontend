const qs = new URLSearchParams(window.location.search);
const categoryId = qs.get("category");
const page = qs.get("page");
const itemBox = document.querySelector("#item-box");
const itemTable = document.querySelector("#item-table tbody");
const pagination = document.querySelector("#pagination");
const submitCard = document.querySelector("#submit-card");

async function item() {
  // 상품리스트 가져오기
  const res = await fetch(`/api/categories/${categoryId}/items?perPage=5&page=${page}`);
  if (!res.ok) {
  }
  const data = await res.json();
  const items = data.items;
  items.map((item, idx) => {
    itemTable.innerHTML += `
    <tr id="${idx}">
      <td>${item.id}</td>
      <td>${item.name}</td>
      <td>${item.price}</td>
    </tr>
    `;
  });
  for (let i = 1; i <= Number(data.totalPage); i++) {
    pagination.innerHTML += `<a href="?category=${categoryId}&page=${i}">${i}</a>`;
  }

  itemTable.addEventListener("click", function (e) {
    e.preventDefault();
    const idx = Number(e.target.parentElement.id);
    const item = items[idx];
    console.log(item);
  });
}

item();

// 이미지 미리보기
/* att_zone : 이미지들이 들어갈 위치 id, btn : file tag id */
imageView = function imageView(att_zone, btn) {
  var attZone = document.getElementById(att_zone);
  var btnAtt = document.getElementById(btn);
  var sel_files = [];

  // 이미지와 체크 박스를 감싸고 있는 div 속성
  var div_style = "display:inline-block;position:relative;" + "width:150px;height:120px;margin:5px;border:1px solid #00f;z-index:1";
  // 미리보기 이미지 속성
  var img_style = "width:100%;height:100%;z-index:none";
  // 이미지안에 표시되는 체크박스의 속성
  var chk_style =
    "width:30px;height:30px;position:absolute;font-size:24px;" +
    "right:0px;bottom:0px;z-index:999;background-color:rgba(255,255,255,0.1);color:#f00";

  btnAtt.onchange = function (e) {
    var files = e.target.files;
    if (files.length > 2) {
      alert("메인 이미지는 최대 2개까지만 가능합니다.");
      btnAtt.value = "";
      return;
    }
    var fileArr = Array.prototype.slice.call(files);
    for (f of fileArr) {
      imageLoader(f);
    }
  };

  // 탐색기에서 드래그앤 드롭 사용
  // attZone.addEventListener(
  //   "dragenter",
  //   function (e) {
  //     e.preventDefault();
  //     e.stopPropagation();
  //   },
  //   false
  // );

  // attZone.addEventListener(
  //   "dragover",
  //   function (e) {
  //     e.preventDefault();
  //     e.stopPropagation();
  //   },
  //   false
  // );

  // attZone.addEventListener(
  //   "drop",
  //   function (e) {
  //     var files = {};
  //     e.preventDefault();
  //     e.stopPropagation();
  //     files;
  //     var dt = e.dataTransfer;
  //     files = dt.files;
  //     if (btnAtt.files.length + files.length > 2) {
  //       alert("메인 이미지는 최대 2개 까지만 가능합니다.");
  //       return;
  //     }
  //     for (f of files) {
  //       imageLoader(f);
  //     }
  //   },
  //   false
  // );

  /*첨부된 이미리즐을 배열에 넣고 미리보기 */
  imageLoader = function (file) {
    sel_files.push(file);
    var reader = new FileReader();
    reader.onload = function (e_read) {
      let img = document.createElement("img");
      img.setAttribute("style", img_style);
      img.src = e_read.target.result;
      attZone.appendChild(makeDiv(img, file));
    };

    reader.readAsDataURL(file);
  };

  /*첨부된 파일이 있는 경우 checkbox와 함께 attZone에 추가할 div를 만들어 반환 */
  makeDiv = function (img, file) {
    var div = document.createElement("div");
    div.setAttribute("style", div_style);

    var btn = document.createElement("input");
    btn.setAttribute("type", "button");
    btn.setAttribute("value", "x");
    btn.setAttribute("delFile", file.name);
    btn.setAttribute("style", chk_style);
    btn.onclick = function (ev) {
      var ele = ev.srcElement;
      var delFile = ele.getAttribute("delFile");
      for (var i = 0; i < sel_files.length; i++) {
        if (delFile == sel_files[i].name) {
          sel_files.splice(i, 1);
        }
      }

      dt = new DataTransfer();
      for (f in sel_files) {
        var file = sel_files[f];
        dt.items.add(file);
      }
      btnAtt.files = dt.files;
      var p = ele.parentNode;
      attZone.removeChild(p);
    };
    div.appendChild(img);
    div.appendChild(btn);
    return div;
  };
};
imageView("main_image_zone", "input_main_image");
// imageView('att_zone', 'input_file')
