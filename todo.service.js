const fs = require("fs");
class TODOService {
  readFile() {
    const data = fs.readFileSync("data.txt", "utf-8");
    return JSON.parse(data);
  }

  writeFile(data) {
    fs.writeFileSync("data.txt", JSON.stringify(data));
  }

  getAll() {
    return this.readFile();
  }

  creatTODO(name) {
    const arr = this.readFile();
    arr.push(name);
    this.writeFile(arr);
  }

  deleteTODO(index) {
    const arr = this.readFile();
    const newArr = arr.filter((x, i) => {
      console.log(i, index);
      return i !== index;
    });
    console.log(newArr);
    this.writeFile(newArr);
  }
}

module.exports = TODOService;
