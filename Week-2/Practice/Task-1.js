"use strict";

// O(#message + #mrstations)
// O(m+n)
// O(n)
function findAndPrint(messages, currentStation) {
  // your code here
  const green_line = [
    "Songshan",
    "Nanjing Sanmin",
    "Taipei Arena",
    "Nanjing Fuxing",
    "Songjiang Nanjing",
    "Zhongshan",
    "Beimen",
    "Ximen",
    "Xiaonanmen",
    "Chiang Kai-Shek Memorial Hall",
    "Guting",
    "Taipower Building",
    "Gongguan",
    "Wanlong",
    "Jingmei",
    "Dapinglin",
    "Qizhang",
    "Xindian City Hall",
    "Xindian",
  ];

  let mrtStations = [];

  Object.values(messages).forEach((message) => {
    let start_index, end_index, stationName;

    if (message.includes("station")) {
      if (message.includes("near")) {
        start_index = message.indexOf("near") + "near".length;
      } else {
        start_index = message.indexOf("at") + "at".length;
      }
      end_index = message.indexOf("station");
      stationName = message.substring(start_index, end_index).trim();
    } else {
      start_index = message.indexOf("at") + "at".length;
      end_index = message.indexOf(".");
      stationName = message.substring(start_index, end_index).trim();
    }

    stationName = stationName.replace(" MRT", "");
    mrtStations.push(stationName);
  });

  let currentStationIndex =
    currentStation == "Xiaobitan" ? 16 : green_line.indexOf(currentStation);

  let minLength = Infinity;
  let minIndex = -1;
  mrtStations.forEach((station, i) => {
    let index = station === "Xiaobitan" ? 16 : green_line.indexOf(station);
    let length =
      station === "Xiaobitan"
        ? Math.abs(index - currentStationIndex) + 1
        : Math.abs(index - currentStationIndex);
    if (station === "Xiaobitan" && currentStation == "Xiaobitan") {
      minLength = 0;
      minIndex = i;
    } else if (length < minLength) {
      minLength = length;
      minIndex = i;
    }
  });

  const closestMessageKey = Object.keys(messages)[minIndex];
  console.log(closestMessageKey);
}
const messages = {
  Bob: "I'm at Ximen MRT station.",
  Mary: "I have a drink near Jingmei MRT station.",
  Copper: "I just saw a concert at Taipei Arena.",
  Leslie: "I'm at home near Xiaobitan station.",
  Vivian: "I'm at Xindian station waiting for you.",
  test: "I'm at Qizhang station",
};

findAndPrint(messages, "Wanlong"); // print Mary
findAndPrint(messages, "Songshan"); // print Copper
findAndPrint(messages, "Qizhang"); // print Leslie
findAndPrint(messages, "Ximen"); // print Bob
findAndPrint(messages, "Xindian City Hall"); // print Vivian
findAndPrint(messages, "Xiaobitan");

// Regrex 提取捷運站名稱
