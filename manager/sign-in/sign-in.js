// 로그인 폼 이벤트 핸들러
document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault();

  // 사용자 이름과 비밀번호 가져오기
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  // 간단한 로그인 검증
  if (username === 'user' && password === 'password') {
      // 로그인 성공 시 메시지 표시
      document.getElementById('error-message').textContent = '로그인 성공!';
  } else {
      // 로그인 실패 시 오류 메시지 표시
      document.getElementById('error-message').textContent = '로그인 실패. 사용자 이름 또는 비밀번호를 확인하세요.';
  }
});
