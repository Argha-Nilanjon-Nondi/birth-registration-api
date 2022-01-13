const router = require("express").Router();

const db=require("../Db/index");


router.post("/login", (request, response) => {
     console.log(request.body);
  response.send("login");
});

module.exports = router;
