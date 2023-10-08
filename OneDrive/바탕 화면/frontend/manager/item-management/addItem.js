const addButton = document.getElementById("addingButton");
const tableEl = document.getElementById("table");

const itemForm = `
<tr>
<td><input type="file" name="image" id="image-input"></td>
<td><select name="category-selector" id="">
  <option value="">Plant</option>
  <option value="">Pot</option>
  <option value="">Gardening Tool</option>
  <option value="">Gardening Kit</option>
</select></td>
<td><input type="text" placeholder="상품이름"></td>
<td><input type="text" placeholder="상품번호"></td>
<td><input type="text" placeholder="단가"></td>
<td align="right">
  <button class="button-description">상세</button>
  <button class="button-delete">삭제</button>
</td>
</tr>
`;

function addingItemForm() {
  tableEl.innerHTML = itemForm;
  document.body.prepend(tableEl);
}

addButton.addEventListener("click", addingItemForm);
