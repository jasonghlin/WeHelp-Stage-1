const menubar = document.querySelector(".menu");
const sidebar = document.querySelector(".sidebar");
const exit = document.querySelector(".exit");

menubar.addEventListener("click", () => {
  sidebar.style.display = "flex";
});

exit.addEventListener("click", () => {
  sidebar.style.display = "none";
});
