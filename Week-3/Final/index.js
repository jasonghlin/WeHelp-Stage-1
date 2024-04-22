"use strict";
const URL =
  "https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment-1";

async function getData() {
  try {
    let response = await fetch(URL);
    // console.log(response);
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function loadPromotion(containerBox, title_figure_data) {
  for (let i = 0; i < 3; i++) {
    if (i === 0) {
      let promotionDiv = document.createElement("div");
      promotionDiv.className = "promotion promotion-1";
      // promotionDiv.style.gridColumn = `1 / 2`;

      let img = document.createElement("img");
      img.src = title_figure_data[i].figure;
      promotionDiv.appendChild(img);

      let titleDiv = document.createElement("div");
      titleDiv.textContent = title_figure_data[i].title;
      promotionDiv.appendChild(titleDiv);

      containerBox.appendChild(promotionDiv);
    } else if (i === 1 || i === 2) {
      let containerBox = document.querySelector(".container");
      let promotionDiv = document.createElement("div");
      promotionDiv.className = `promotion promotion-${i + 1}`;
      // promotionDiv.style.gridColumn = `${2 * i} / ${2 * i + 2}`;

      let img = document.createElement("img");
      img.src = title_figure_data[i].figure;
      promotionDiv.appendChild(img);

      let titleDiv = document.createElement("div");
      titleDiv.textContent = title_figure_data[i].title;
      promotionDiv.appendChild(titleDiv);

      containerBox.appendChild(promotionDiv);
    }
  }
  for (let _ = 0; _ < 3; _++) {
    title_figure_data.shift();
  }
}

// loadTitle
function loadTitle(containerBox, title_figure_data, i) {
  let titleDivContainer = document.createElement("div");
  titleDivContainer.className = `title title-${(i % 10) + 1}`;

  let img = document.createElement("img");
  if (!title_figure_data[i]?.figure) {
    loadMoreButton.classList.add("loadBtn_hidden");
  }
  img.src = title_figure_data[i].figure;
  titleDivContainer.appendChild(img);

  let titleDiv = document.createElement("div");
  titleDiv.textContent = title_figure_data[i].title;
  titleDivContainer.appendChild(titleDiv);

  // 創建 SVG 元素
  let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "16");
  svg.setAttribute("height", "16");
  svg.setAttribute("fill", "currentColor");
  svg.setAttribute("class", "bi bi-star-fill");
  svg.setAttribute("viewBox", "0 0 16 16");

  // 創建 path 元素
  let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    "M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
  );

  // 將 path 添加到 SVG 中
  svg.appendChild(path);

  // // 創建 star 元素
  let button = document.createElement("button");
  button.className = "star";
  button.appendChild(svg);
  titleDivContainer.appendChild(button);

  containerBox.appendChild(titleDivContainer);
}

// handle load more limit
function handleButtonStatus() {
  if (pageCount === currentPage) {
    console.log("end");
    loadMoreButton.classList.add("loadBtn_hidden");
  }
}

// logics
function addCards(pageIndex, containerBox) {
  currentPage = pageIndex;

  // detect card limit

  const startRange = (pageIndex - 1) * cardIncrease;
  const endRange =
    currentPage == pageCount ? cardLimit : pageIndex * cardIncrease - 1;

  for (let i = startRange; i <= endRange; i++) {
    loadTitle(containerBox, title_figure_data, i);
  }
  handleButtonStatus();
}
let data;
// set card status
let title_figure_data;
let cardLimit;
let cardIncrease;
let currentPage;
let pageCount;
let loadMoreButton;

async function init() {
  // page limit

  data = await getData();
  title_figure_data = data.data.results.map((el) => {
    return {
      title: el.stitle,
      figure: "https://" + el.filelist.split("https://")[1],
    };
  });
  // console.log(title_figure_data);

  pageCount = Math.ceil(cardLimit / cardIncrease);

  currentPage = 1;
  // load more btn
  loadMoreButton = document.querySelector(".loadBtn");

  // set card status
  cardLimit = title_figure_data.length;
  cardIncrease = 10;

  // create card
  let containerBox = document.querySelector(".container");
  loadPromotion(containerBox, title_figure_data);
  addCards(currentPage, containerBox);
  // load initial cards
  // window.onload = function () {
  //   addCards(currentPage, containerBox);
  // };

  // handle load more

  loadMoreButton.addEventListener("click", () => {
    addCards(currentPage + 1, containerBox);
  });

  const menubar = document.querySelector(".menu");
  const sidebar = document.querySelector(".sidebar");
  const exit = document.querySelector(".exit");

  menubar.addEventListener("click", () => {
    sidebar.style.display = "flex";
  });

  exit.addEventListener("click", () => {
    sidebar.style.display = "none";
  });
}

window.onload = init;
