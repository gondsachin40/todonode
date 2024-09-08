const http = require("http");
const fs = require("fs");
let todos = ["gourav", "sourav", "papita"];
const myserver = http.createServer((req, res) => {
  // getting to do
  if (req.url === "/getTODO") {
    fs.readFile("s.html", "utf-8", (err, data) => {
      if (err) {
        res.end("error handling");
      } else {
        res.write(data);
        for (let i = 0; i < todos.length; i++) {
          res.write(
            `${todos[i]} <a href='/deleteTODO?index=${i}'>delete</a> </br>`
          );
        }
        res.end();
      }
    });
  } else if (req.url.includes("/postTODO")) {
    const splitData = req.url.split("?");
    const params = splitData[1];
    const paramsArr = params.split("&");
    const outputParams = new Map();
    for (let i = 0; i < paramsArr.length; i++) {
      console.log(paramsArr[i].split("="));
      const [key, value] = paramsArr[i].split("=");
      outputParams.set(key, value);
    }
    const createdTODO = outputParams.get("todo");
    todos.push(createdTODO);
    res.writeHead(301, {
      location: "/getTODO",
    });
    res.end();
  } else if (req.url.includes("/deleteTODO")) {
    const splitt = req.url.split("=");
    let indexx = parseInt(splitt[1]);
    console.log(indexx);
    console.log("todos", todos);
    for (let i = indexx + 1; i < todos.length; i++) {
      console.log("***inside loop***");
      console.log(i, indexx);
      let t = todos[indexx];
      todos[indexx] = todos[i];
      todos[i] = t;
      console.log(todos);
      indexx++;
    }
    console.log(todos);
    todos.pop();
    
    res.writeHead(301,{
      location: "/getTODO",
    });
    res.end();
  } else {
    console.log(req.url);
    return res.end("no route available");
  }
});
myserver.listen(8000);
