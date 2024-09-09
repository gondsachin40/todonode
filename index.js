const fs = require("fs");
const http = require("http");

const myserver = http.createServer((req, res) => {
  if (req.url === "/goto") {
    //    res.write('comes to goto page');
    const bn = fs.readFileSync("server.html", "utf-8");
    res.write(`${bn}`);
    const todosdata = fs.readFileSync("data.txt", "utf-8");
    const todos = JSON.parse(todosdata);
    for (let i = 0; i < todos.length; i++)
      res.write(
        `${todos[i]}<a href ="/delete${i}" style = "padding-left: 1%">❌<a><br>`
      );
    res.end();
  } else if (req.url.includes("/posttodo?")) {
    // res.write("post page");
    const temp = req.url;
    const temp2 = temp.split("=");
    const bn = JSON.parse(fs.readFileSync("data.txt", "utf-8"));
    bn.push(temp2[1]);
    fs.writeFileSync("data.txt", JSON.stringify(bn));
    const tt = fs.readFileSync("data.txt", "utf-8");
    res.writeHead(302, {
      location: "/goto",
    });
    res.end();
  } else if (req.url.includes("/delete")) {
    const temp = req.url;
    const temp2 = temp.split("delete");
    const index = parseInt(temp2[1]);
    let bn = JSON.parse(fs.readFileSync("data.txt", "utf-8"));
    bn = bn.filter((x, i) => {
      return i !== index;
    });
    fs.writeFileSync("data.txt", JSON.stringify(bn));
    res.writeHead(302, {
      location: "/goto",
    });
    res.end();
  } else {
    res.write("no routes available");
    res.end();
  }
});
myserver.listen(8000);
