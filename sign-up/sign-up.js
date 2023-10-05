$(function () {
  $('input[name="birthday"]').daterangepicker(
    {
      singleDatePicker: true,
      showDropdowns: true,
      minYear: 1901,
      maxYear: parseInt(moment().format("YYYY"), 10),
    },
    function (start, end, label) {
      var years = moment().diff(start, "years");
      alert("You are " + years + " years old!");
    }
  );
});

function validatePhone() {
  const phone = document.getElementById("phoneInput").value;
  const regex = /^\d{3}-\d{3,4}-\d{4}$/;

  if (regex.test(phone)) {
    alert("유효한 전화번호입니다.");
  } else {
    alert("유효하지 않은 전화번호입니다.");
  }
}
