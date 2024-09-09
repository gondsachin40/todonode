const TODOService = require("./todo.service");

const t = new TODOService();
console.log(t.getAll());
t.creatTODO("sachin");
console.log(t.getAll());
t.deleteTODO(0);
// t.creatTODO();

// console.log("gourav");

// const t = ["gourav", "sourav"];
// t.push("saching");
// const k = JSON.stringify(t);
// console.log(k);
// file me likuga
