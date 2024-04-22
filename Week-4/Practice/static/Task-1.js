const informCheckbox = document.querySelector(".inform-consent > input");
const loginForm = document.querySelector(".login-form");
const squareForm = document.querySelector(".square-form");
const squareInput = document.querySelector(".square-input");

loginForm.addEventListener("submit", (e) => {
  if (!informCheckbox.checked) {
    e.preventDefault();
    alert("You didn't check it! Let me check it for you.");
  }
});

squareForm.addEventListener("submit", (e) => {
  if (squareInput.value <= 0) {
    e.preventDefault();
    alert("請輸入正整數");
  }
});
