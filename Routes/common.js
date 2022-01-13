const router = require("express").Router();
const middleware=require("../Middlewares/index")
const db=require("../Db/index");


router.post("/login",[middleware.loginRequiredField,middleware.validateUsername,middleware.validatePassword], (request, response) => {
  response.send("login");
});

module.exports = router;
