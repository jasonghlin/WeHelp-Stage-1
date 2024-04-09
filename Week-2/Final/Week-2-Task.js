"use strict";

console.log("-------------- Task-1 --------------");
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
    if (length < minLength) {
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
};

findAndPrint(messages, "Wanlong"); // print Mary
findAndPrint(messages, "Songshan"); // print Copper
findAndPrint(messages, "Qizhang"); // print Leslie
findAndPrint(messages, "Ximen"); // print Bob
findAndPrint(messages, "Xindian City Hall"); // print Vivian

console.log("-------------- Task-2 --------------");
// your code here, maybe
function book(consultants, hour, duration, criteria) {
  let booking = Array(duration + 1)
    .fill()
    .map((element, index) => hour + index);

  let availableConsultants = consultants.filter((consultant, index, arr) => {
    let not_overlap = true;
    for (let i = 0; i < booking.length; i++) {
      if (consultant["busyTime"]?.includes(booking[i])) {
        not_overlap = false;
      }
    }
    return not_overlap;
  });

  let best_consultant = { rate: 0, price: 9999 };

  if (availableConsultants.length === 0) {
    console.log("No Service");
    return;
  }

  if (criteria === "price") {
    for (let i = 0; i < availableConsultants.length; i++) {
      if (availableConsultants[i].price < best_consultant.price) {
        best_consultant = availableConsultants[i];
      }
    }
  } else if (criteria === "rate") {
    for (let i = 0; i < availableConsultants.length; i++) {
      if (availableConsultants[i].rate > best_consultant.rate) {
        best_consultant = availableConsultants[i];
      }
    }
  }

  for (let i = 0; i < consultants.length; i++) {
    if (consultants[i].name === best_consultant.name) {
      consultants[i].busyTime = [...consultants[i].busyTime, ...booking];
    }
  }
  console.log(best_consultant.name);
  // console.log(consultants);
}

const consultants = [
  { name: "John", rate: 4.5, price: 1000 },
  { name: "Bob", rate: 3, price: 1200 },
  { name: "Jenny", rate: 3.8, price: 800 },
];
consultants.forEach((consultant) => {
  consultant["busyTime"] = [];
});
book(consultants, 15, 1, "price"); // Jenny
book(consultants, 11, 2, "price"); // Jenny
book(consultants, 10, 2, "price"); // John
book(consultants, 20, 2, "rate"); // John
book(consultants, 11, 1, "rate"); // Bob
book(consultants, 11, 2, "rate"); // No Service
book(consultants, 14, 3, "price"); // John

console.log("-------------- Task-3 --------------");
function func(...data) {
  // your code here
  const middleName = [];
  let result;
  for (let i = 0; i < data.length; i++) {
    if (data[i].length === 5) {
      middleName.push(data[i][2]);
    } else if (data[i].length === 2) {
      middleName.push(data[i][data[i].length - 1]);
    } else {
      middleName.push(data[i][data[i].length - 2]);
    }
  }

  //   console.log(middleName);
  const uniqueName = middleName.filter((names, _, arr) => {
    return arr.filter((x) => x === names).length === 1;
  });
  //   console.log(uniqueName);

  for (let i = 0; i < data.length; i++) {
    if (uniqueName.length === 0) {
      console.log("沒有");
      return;
    } else {
      result = data.filter((names, _, arr) => {
        return names.includes(uniqueName);
      });
    }
  }
  console.log(result.toString());
}

func("彭大牆", "陳王明雅", "吳明"); // print 彭大牆
func("郭靜雅", "王立強", "郭林靜宜", "郭立恆", "林花花"); // print 林花花
func("郭宣雅", "林靜宜", "郭宣恆", "林靜花"); // print 沒有
func("郭宣雅", "夏曼藍波安", "郭宣恆"); // print 夏曼藍波安

console.log("-------------- Task-4 --------------");
function getNumber(index) {
  // your code here
  if (index == 0) {
    return 0;
  } else if (index % 3 == 0) {
    return getNumber(index - 1) - 1;
  } else {
    return getNumber(index - 1) + 4;
  }
}
console.log(getNumber(1)); // print 4
console.log(getNumber(5)); // print 15
console.log(getNumber(10)); // print 25
console.log(getNumber(30)); // print 70

console.log("-------------- Task-5 --------------");
function find(spaces, stat, n) {
  // your code here
  let finalSeat;
  const haveSeat = spaces.filter((space, index) => {
    return space >= n && stat[index] === 1;
  });
  if (haveSeat.length === 0) {
    console.log(-1);
    return;
  } else {
    finalSeat = haveSeat.reduce((acc, val) => {
      let diff = val - n;
      if (acc - n > diff) return val;
      return acc;
    }, 99);
  }
  // console.log(haveSeat);
  // console.log(finalSeat);
  console.log(spaces.indexOf(finalSeat));
}
find([3, 1, 5, 4, 3, 2], [0, 1, 0, 1, 1, 1], 2); // print 5
find([1, 0, 5, 1, 3], [0, 1, 0, 1, 1], 4); // print -1
find([4, 6, 5, 8], [0, 1, 1, 1], 4); // print 2
