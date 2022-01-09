const router = require("express").Router();

router.post("/login", (request, response) => {
     console.log(request.body);
     console.log("x-api-key" in request.headers);
  response.send("login");
});

module.exports = router;
