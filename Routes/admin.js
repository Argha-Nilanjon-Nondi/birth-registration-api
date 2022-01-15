const router = require("express").Router();

const middleware=require("../Middlewares/index");

router.use(middleware.authoRequiredField)
router.use(middleware.validateToken)
router.use(middleware.validateAdminType)

router.get("/profiles/:id", (request, response) => {
  
   response.setHeader("x-api-key", "oioioio");
});

module.exports = router;
