const http = require("http");
const fs = require("fs");
const myserver = http.createServer((req, res) => {
  if (req.url === "/getTODO") {
    fs.readFile("s.html", "utf-8", (err, data) => {
      res.write(data);
      res.end();
    });
  } else {
    return res.end("no route available");
  }
});
myserver.listen(8000);
