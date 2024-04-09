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
