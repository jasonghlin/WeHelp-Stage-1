const signupName = document.querySelector("#signup_name");
const signupUsername = document.querySelector("#signup_username");
const signupPassword = document.querySelector("#signup_password");
const signupBtn = document.querySelector(".signup-btn");
const signinUsername = document.querySelector("#username");
const signinPassword = document.querySelector("#password");
const signinBtn = document.querySelector(".signin-btn");
let deleteBtns = document.querySelectorAll(".delete-btn");
const messageInput = document.querySelector("#message");
const messageSubmitBtn = document.querySelector(".message-submit-btn");
const queryUsernameBtn = document.querySelector(".query-username-btn");
const queryUsername = document.querySelector(".query-username");
const queryUsernameResult = document.querySelector(".query-username-result");
const updateUsername = document.querySelector(".update-username");
const updateUsernameResult = document.querySelector(".update-username-result");
const updateUsernameBtn = document.querySelector(".update-username-btn");

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
      if (confirm("您確定要刪除留言嗎？") == true) {
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
      }
    });
  });
}

if (queryUsernameBtn) {
  queryUsernameBtn.addEventListener("click", async function (e) {
    if (queryUsername.value === "") {
      e.preventDefault();
      alert("請輸入要查詢的會員姓名");
    } else {
      try {
        let response = await fetch(
          `/api/member?username=${queryUsername.value}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          // console.log(data);
          if (data.data) {
            queryUsernameResult.innerHTML = `${data.data?.name} (${data.data?.username})`;
          } else if (data.Invalid === true) {
            queryUsernameResult.innerHTML = `查詢失敗`;
          } else {
            queryUsernameResult.innerHTML = `查無此人`;
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  });
}

if (updateUsernameBtn) {
  updateUsernameBtn.addEventListener("click", async function (e) {
    if (updateUsername.value === "") {
      e.preventDefault();
      alert("請輸入要更改的姓名");
    } else {
      try {
        let response = await fetch(`/api/member`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: updateUsername.value }),
        });
        if (response.ok) {
          const json_data = await response.json();
          if (json_data.OK === true) {
            updateUsernameResult.innerHTML = `更新成功`;

            const welcomeText = document.querySelector(".welcome-text");
            welcomeText.innerHTML = `${updateUsername.value}，歡迎登入系統
            `;

            // 選取全部的 .deletebtns，如果 session id === closest .message-with-btn .message-name 的 data-id，更新 .message-name
            deleteBtns = document.querySelectorAll(".delete-btn");
            [...deleteBtns].forEach(function (button) {
              let messageName = button
                .closest(".message-with-btn")
                .querySelector(".message-name");
              messageName.innerHTML = `${updateUsername.value}: `;
            });
          } else {
            updateUsernameResult.innerHTML = `更新失敗`;
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  });
}
