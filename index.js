const http = require("http");
const fs = require("fs");
let todos = [];
const myserver = http.createServer((req, res) => {
  // getting to do
  if (req.url === "/getTODO") {
    fs.readFile("s.html", "utf-8", (err, data) => {
      res.write(data);
      res.end();
    });
  }

  // creating to do
  else if (req.url.includes("/postTODO")) {
    console.log(req.url.split("?"));
    const splitData = req.url.split("?");
    const params = splitData[1];
    const paramsArr = params.split("&");
    const outputParams = new Map();
    for (let i = 0; i < paramsArr.length; i++) {
      console.log(paramsArr[i].split("="));
      const [key, value] = paramsArr[i].split("=");
      outputParams.set(key, value);
    }
    console.log(outputParams);
    const createdTODO = outputParams.get("todo");
    todos.push(createdTODO);
    res.write("data came thanku");
    res.end();
  } else {
    console.log(req.url);
    return res.end("no route available");
  }
});
myserver.listen(8000);
