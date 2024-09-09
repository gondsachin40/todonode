const http = require("http");
const fs = require("fs");

// let todos = ["gourav", "sourav", "papita"];
const myserver = http.createServer((req, res) => {
  // getting to do
  if (req.url === "/getTODO") {
    fs.readFile("s.html", "utf-8", (err, data) => {
      if (err) {
        res.end("error handling");
      } else {
        res.write(data);
        const todosFileData = fs.readFileSync("data.txt", "utf-8");
        const todos = JSON.parse(todosFileData);
        for (let i = 0; i < todos.length; i++) {
          res.write(
            `${todos[i]} <a href='/deleteTODO?index=${i}'>delete</a> </br>`
          );
        }
        res.end();
      }
    });
  } else if (req.url.includes("/postTODO") && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const todo = body.split("=")[1];
      try {
        // todos.push(todo);
        const todosFileData = fs.readFileSync("data.txt", "utf-8");
        const todos = JSON.parse(todosFileData);
        todos.push(todo);
        fs.writeFileSync("data.txt", JSON.stringify(todos));
        res.writeHead(301, {
          location: "/getTODO",
        });
      } catch (err) {
        console.error("Invalid JSON");
      }
      res.end("POST request received");
    });
  } else if (req.url.includes("/deleteTODO")) {
    const splitt = req.url.split("=");
    let indexx = parseInt(splitt[1]);
    const todosFileData = fs.readFileSync("data.txt", "utf-8");
    let todos = JSON.parse(todosFileData);
    todos = todos.filter((x, index) => index != indexx);
    fs.writeFileSync("data.txt", JSON.stringify(todos));
    res.writeHead(301, {
      location: "/getTODO",
    });
    res.end();
  } else {
    console.log(req.url);
    return res.end("no route available");
  }
});
myserver.listen(8000);
