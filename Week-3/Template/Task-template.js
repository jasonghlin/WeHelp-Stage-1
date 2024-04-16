try {
  async function getData() {
    let response = await fetch("網址");
    console.log(response);
    let data = await response.json();
    console.log(data);
  }
} catch (err) {
  console.log(err);
}
