const router = require("express").Router();
const db = require("../../Db/index");
const middleware = require("../../Middlewares/index");

router.get(
  "/person/:person_birth_reg_id",
  [middleware.validatePersonBirthID, middleware.validateBirthRegIdExist],
  (request, response) => {
    const birth_reg_id = request.params.person_birth_reg_id;
    db.getPersonProfileByRegID(birth_reg_id, (data) => {
      if (data === "error") {
        response.json({
          code: 3004,
          message: "some errors has been occured",
        });
      } else {
        response.json({
          code: 2004,
          message: "person data is found for the birth registration id",
          data: data,
        });
      }
    });
  }
);

module.exports = router;
