const router = require("express").Router();

router.get("/profiles/:id", (request, response) => {
    const id=request.params.id;
    console.log(id);
  response.send("hi api world");
});

module.exports = router;
