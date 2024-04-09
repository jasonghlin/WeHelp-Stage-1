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
