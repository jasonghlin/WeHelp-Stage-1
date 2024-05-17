const URL =
  "https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment-1";

let response, rawData;
try {
  response = await fetch(URL);
  rawData = await response.json();
} catch (err) {
  console.log("Error when fetching data");
}

console.log(rawData.data);
function createElementWithClass(element, className) {
  let el = document.createElement(element);
  el.className = className;
  return el;
}

function createPromotion(container, data, i) {
  let pormotionEl = createElementWithClass("div", "promotion");
  let div = document.createElement("div");
  let img = document.createElement("img");
  img.src = "https://" + data.filelist.split("https://")[1];
  div.textContent = data.stitle;
  pormotionEl.appendChild(img);
  pormotionEl.appendChild(div);
  container.appendChild(pormotionEl);
  console.log(container);
}

function createTitle(data) {
  let attractions = [];
  for (let i = 0; i < data.length; i++) {
    let img = document.createElement("img");
    img.src = "./ZKZg.gif";
    img.dataset.src = "https://" + data[i].filelist.split("https://")[1];
    let div = document.createElement("div");
    div.textContent = data[i].stitle;
    const lazyloading = function (entries) {
      const [entry] = entries;
      if (entry.isIntersecting) {
        img.src = img.dataset.src;
      }
    };
    const obsOptions = {
      rootMargin: "50px 0px",
      root: null,
      threshold: 0,
    };
    const imgObserver = new IntersectionObserver(lazyloading, obsOptions);
    imgObserver.observe(img);
    // 創建按鈕元素
    let button = document.createElement("button");
    button.className = "star";

    // 創建 SVG 元素
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "16");
    svg.setAttribute("height", "16");
    svg.setAttribute("fill", "currentColor");
    svg.setAttribute("viewBox", "0 0 16 16");
    svg.setAttribute("class", "bi bi-star-fill");

    // 創建 path 元素
    let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      "M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
    );

    // 組合 SVG 元素
    svg.appendChild(path);

    // 將 SVG 添加到按鈕
    button.appendChild(svg);

    if (i % 5 === 0) {
      let bigger = createElementWithClass("div", "title bigger");
      bigger.appendChild(img);
      bigger.appendChild(div);
      bigger.appendChild(button);
      attractions.push(bigger);
    } else if (i % 5 === 1 || i % 5 === 3) {
      let titleCombine = createElementWithClass("div", "title-combine");

      let titleDiv = createElementWithClass("div", "title");
      titleDiv.appendChild(img);
      titleDiv.appendChild(div);
      titleDiv.appendChild(button);

      let titleDiv2 = createElementWithClass("div", "title");
      let img2 = document.createElement("img");
      img2.src = "./ZKZg.gif";
      img2.dataset.src = "https://" + data[i + 1].filelist.split("https://")[1];
      const lazyloading = function (entries) {
        const [entry] = entries;
        if (entry.isIntersecting) {
          img2.src = img2.dataset.src;
        }
      };
      const obsOptions = {
        rootMargin: "50px 0px",
        root: null,
        threshold: 0,
      };
      const imgObserver2 = new IntersectionObserver(lazyloading, obsOptions);
      imgObserver2.observe(img2);

      let div2 = createElementWithClass("div", "");
      div2.textContent = data[i + 1].stitle;
      titleDiv2.appendChild(img2);
      titleDiv2.appendChild(div2);

      let button2 = document.createElement("button");
      button2.className = "star";

      // 創建 SVG 元素
      let svg2 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg2.setAttribute("width", "16");
      svg2.setAttribute("height", "16");
      svg2.setAttribute("fill", "currentColor");
      svg2.setAttribute("viewBox", "0 0 16 16");
      svg2.setAttribute("class", "bi bi-star-fill");

      // 創建 path 元素
      let path2 = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      path2.setAttribute(
        "d",
        "M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
      );

      // 組合 SVG 元素
      svg2.appendChild(path2);

      // 將 SVG 添加到按鈕
      button2.appendChild(svg2);

      titleDiv2.appendChild(button2);

      titleCombine.appendChild(titleDiv);
      titleCombine.appendChild(titleDiv2);
      attractions.push(titleCombine);
    }
  }
  return attractions;
}

let root = document.querySelector(".container");
for (let i = 0; i < 3; i++) {
  createPromotion(root, rawData.data.results[i], i + 1);
  rawData.data.results.shift();
}
let isLoading = false;
function handleScroll(domContainer, page = 0, data) {
  let start = page * 10;
  let end = (page + 1) * 10;
  let attractionElement = createTitle(data);
  for (let i = start; i < end; i++) {
    domContainer.appendChild(attractionElement[i]);
  }
  isLoading = false;
}

handleScroll(root, 0, rawData.data.results);
let page = 1;
const maxPage = Math.ceil(rawData.data.results.length / 10);
window.addEventListener("scroll", () => {
  const { bottom } = root.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  if (bottom <= windowHeight + 10 && !isLoading && page < maxPage) {
    isLoading = true;
    handleScroll(root, page, rawData.data.results);
    page++;
    console.log(page);
  }
});
