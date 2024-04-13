let schedule = {
  John: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24,
  ],

  Bob: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24,
  ],

  Jenny: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24,
  ],
};

function book(consultants, hour, duration, criteria) {
  let nameOrder = [];
  //處理考慮rate或price的問題，sort array
  switch (criteria) {
    case "price":
      consultants.sort(function (a, b) {
        return a.price > b.price ? 1 : -1;
      });
      break;

    case "rate":
      consultants.sort(function (a, b) {
        return a.rate < b.rate ? 1 : -1;
      });
      break;
  }

  consultants.forEach((obj) => {
    nameOrder.push(obj.name);
  });
  // console.log(nameOrder);

  // 處理時間問題;
  //看人
  for (let i = 0; i < nameOrder.length; i++) {
    // nameOrder[i] 就是人名
    let end = false;
    // 看時間
    for (let j = 0; j < schedule[nameOrder[i]].length; j++) {
      if (
        schedule[nameOrder[i]][j] == hour &&
        schedule[nameOrder[i]][j + duration] == hour + duration
      ) {
        console.log("就決定是你了" + nameOrder[i]);
        schedule[nameOrder[i]].splice(j, duration);
        end = true;
        break;
      }
    }
    if (end) {
      break;
    } else if (i == nameOrder.length - 1) {
      console.log("下次請早");
    }
  }
}

const consultants = [
  { name: "John", rate: 4.5, price: 1000 },
  { name: "Bob", rate: 3, price: 1200 },
  { name: "Jenny", rate: 3.8, price: 800 },
];
// consultants[0].time = [1, 2, 3];

book(consultants, 15, 1, "price"); // Jenny
book(consultants, 11, 2, "price"); // Jenny
book(consultants, 10, 2, "price"); // John
book(consultants, 20, 2, "rate"); // John
book(consultants, 11, 1, "rate"); // Bob
book(consultants, 11, 2, "rate"); // No Service
book(consultants, 14, 3, "price"); // John
