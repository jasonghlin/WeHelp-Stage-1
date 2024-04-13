// your code here, maybe
// O(duration + i) + O(#consultants * #booking * k) + O(#available_consultants) + O(#consultants)
// O(n) + O(k*m*n) + O(n) + O(n)
// O(n^3)
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
