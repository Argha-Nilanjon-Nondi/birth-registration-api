const router = require("express").Router();

const middleware = require("../Middlewares/index");

router.use(middleware.authoRequiredField);
router.use(middleware.validateToken);
router.use(middleware.validateAdminType);

router.post(
  "/person/",
  [
    middleware.personAddRequiredField,
    middleware.validatePersonName,
    middleware.validateFatherName,
    middleware.validateMotherName,
    middleware.validateFatherNID,
    middleware.validateMotherNID,
    middleware.validateFatherBirthID,
    middleware.validateMotherBirthID,
    middleware.validatePersonBirthDate,
    middleware.validatePersonBirthVaccineID,
    middleware.validatePersonGenderType,
    middleware.validatePersonBirthNo,
  ],
  (request, response) => {
    console.log(request);
    response.setHeader("x-api-key", "oioioio");
  }
);

module.exports = router;
