const router = require("express").Router();


router.use((request,response,next)=>{
   console.log(request)
})

router.get("/profiles/:id", (request, response) => {
  
   response.setHeader("x-api-key", "oioioio");
});

module.exports = router;
