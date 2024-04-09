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
