const router = require("express").Router();

router.get("/profiles/:id", (request, response) => {
  
   response.setHeader("x-api-key", "oioioio");
});

module.exports = router;
