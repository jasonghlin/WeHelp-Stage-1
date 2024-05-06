let signupName = document.querySelector("#signup_name");
let signupUsername = document.querySelector("#signup_username");
let signupPassword = document.querySelector("#signup_password");
let signupBtn = document.querySelector(".signup-btn");
let signinUsername = document.querySelector("#username");
let signinPassword = document.querySelector("#password");
let signinBtn = document.querySelector(".signin-btn");
let deleteBtns = document.querySelectorAll(".delete-btn");
let messageInput = document.querySelector("#message");
let messageSubmitBtn = document.querySelector(".message-submit-btn");

if (signupBtn) {
  signupBtn.addEventListener("click", function (e) {
    if (
      signupName.value === "" ||
      signupUsername.value === "" ||
      signupPassword.value === ""
    ) {
      e.preventDefault();
      alert("請輸入完整的姓名、帳號、密碼");
    }
  });
}

if (signinBtn) {
  signinBtn.addEventListener("click", function (e) {
    if (signinUsername.value === "" || signinPassword.value === "") {
      e.preventDefault();
      alert("請輸入完整的帳號、密碼");
    }
  });
}

if (messageSubmitBtn) {
  messageSubmitBtn.addEventListener("click", function (e) {
    if (messageInput.value === "") {
      e.preventDefault();
      alert("請輸入留言內容");
    }
  });
}

if (deleteBtns) {
  [...deleteBtns].forEach(function (button) {
    button.addEventListener("click", async () => {
      let messageId = button.closest(".message-with-btn").dataset.id;
      try {
        let response = await fetch("/deleteMessage", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ messageId }),
        });

        if (response.ok) {
          window.location.href = "http://127.0.0.1:8000/member";
        }
      } catch (error) {
        console.error(error);
      }
    });
  });
}
