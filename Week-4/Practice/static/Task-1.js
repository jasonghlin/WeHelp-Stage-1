const informCheckbox = document.querySelector(".inform-consent > input");
const loginForm = document.querySelector(".login-form");
// const squareForm = document.querySelector(".square-form");
const squareInput = document.querySelector(".square-input");
const calculateBtn = document.querySelector(".calculate-btn");

loginForm.addEventListener("submit", (e) => {
  if (!informCheckbox.checked) {
    e.preventDefault();
    alert("You didn't check it! Let me check it for you.");
  }
});

calculateBtn.addEventListener("click", (e) => {
  if (squareInput.value <= 0) {
    e.preventDefault();
    alert("請輸入正整數");
  } else {
    window.location.href = `http://127.0.0.1:8000/square/${squareInput.value}`;
  }
});

// Version 2 without jinja2 template
// document.addEventListener("DOMContentLoaded", (event) => {
//   squareForm.addEventListener("submit", function (e) {
//     squareForm.action = "/square/" + encodeURIComponent(squareInput.value);
//     squareInput.disabled = true;
//   });
// });
