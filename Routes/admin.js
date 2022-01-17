const router = require("express").Router();
const { pbkdf2Sync } = require("crypto");
const db = require("../Db/index");
const lib = require("../Lib/index");
const middleware = require("../Middlewares/index");

router.use(middleware.authoRequiredField);
router.use(middleware.validateToken);
router.use(middleware.validateAdminType);

// add a person data
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
    middleware.validateVaccinIdExist,
    middleware.validatePersonGenderType,
    middleware.validatePersonBirthNo,
  ],
  (request, response) => {
    let data = {
      person_name: request.body["person_name"],
      person_birth_date: request.body["person_birth_date"],
      person_birth_no: request.body["person_birth_no"],
      person_birth_place: request.body["person_birth_place"],
      person_gender: request.body["person_gender"],
      person_birth_vaccine_id: request.body["person_birth_vaccine_id"],
      father_name: request.body["father_name"],
      mother_name: request.body["mother_name"],
      father_birth_reg_id: request.body["father_birth_reg_id"],
      father_national_id: request.body["father_national_id"],
      mother_birth_reg_id: request.body["mother_birth_reg_id"],
      mother_national_id: request.body["mother_national_id"],
    };
    db.addPersonData(data, (status) => {
      if (status === true) {
        response.json({
          code: 2001,
          message: "person data is added",
        });
      } else if (status === "error") {
        response.json({
          code: 3004,
          message: "some errors has been occured",
        });
      }
    });
  }
);

// update person data
router.put(
  "/person/",
  [middleware.personUpdateRequiredField, middleware.validateBirthRegIdExist],
  (request, response) => {
    let data = {};

    if (lib.fieldFind(["person_name"], request.body) === true) {
      let person_name = request.body["person_name"];
      if (lib.isNameValid(person_name) === false) {
        response.json({ code: 3009, message: "person name is invalid" });
        return 0;
      } else {
        data.person_name = person_name;
      }
    }

    if (lib.fieldFind(["person_birth_date"], request.body) === true) {
      let person_birth_date = request.body["person_birth_date"];
      if (lib.isDateValid(person_birth_date) === false) {
        response.json({ code: 3019, message: "person birth date is invalid" });
        return 0;
      } else {
        data.person_birth_date = person_birth_date;
      }
    }

    if (lib.fieldFind(["person_birth_no"], request.body) === true) {
      let person_birth_no = request.body["person_birth_no"];
      if (lib.isBirthNoValid(person_birth_no) === false) {
        response.json({ code: 3018, message: "person birth no is invalid" });
        return 0;
      } else {
        data.person_birth_no = person_birth_no;
      }
    }

    if (lib.fieldFind(["person_birth_place"], request.body) === true) {
      data.person_birth_place = request.body["person_birth_place"];
    }

    if (lib.fieldFind(["person_gender"], request.body) === true) {
      let person_gender = request.body["person_gender"];
      if (lib.isGenderTypeValid(person_gender) === false) {
        response.json({ code: 3017, message: "person gender type is invalid" });
        return 0;
      } else {
        data.person_gender = person_gender;
      }
    }

    if (lib.fieldFind(["person_birth_vaccine_id"], request.body) === true) {
      let person_birth_vaccine_id = request.body["person_birth_vaccine_id"];
      if (lib.isBVIdValid(person_birth_vaccine_id) === false) {
        response.json({
          code: 3016,
          message: "person birth vaccine id is invalid",
        });
        return 0;
      } else {
        db.isVaccineIdExist(person_birth_vaccine_id, (status) => {
          if (status === false) {
            data.person_birth_vaccine_id = person_birth_vaccine_id;
          } else if (status === true) {
            response.json({
              code: 3020,
              message: "vaccine id is already exist",
            });
            return 0;
          } else if (status === "error") {
            response.json({
              code: "3004",
              message: "some errors has been occured",
            });
            return 0;
          }
        });
      }
    }

    if (lib.fieldFind(["father_name"], request.body) === true) {
      let father_name = request.body["father_name"];
      if (lib.isNameValid(father_name) === false) {
        response.json({ code: 3010, message: "father name is invalid" });
        return 0;
      } else {
        data.father_name = father_name;
      }
    }

    if (lib.fieldFind(["mother_name"], request.body) === true) {
      let mother_name = request.body["mother_name"];
      if (lib.isNameValid(mother_name) === false) {
        response.json({ code: 3011, message: "mother name is invalid" });
        return 0;
      } else {
        data.mother_name = mother_name;
      }
    }

    if (lib.fieldFind(["father_birth_reg_id"], request.body) === true) {
      let father_birth_id = request.body["father_birth_reg_id"];
      if (lib.isBRIdValid(father_birth_id) === false) {
        response.json({
          code: 3014,
          message: "father birth registration id is invalid",
        });
        return 0;
      } else {
        data.father_birth_reg_id = father_birth_id;
      }
    }

    if (lib.fieldFind(["father_national_id"], request.body) === true) {
      let father_nid = request.body["father_national_id"];
      if (lib.isNIdValid(father_nid) === false) {
        response.json({ code: 3012, message: "father national id is invalid" });
        return 0;
      } else {
        data.father_national_id = father_nid;
      }
    }

    if (lib.fieldFind(["mother_birth_reg_id"], request.body) === true) {
      let mother_birth_id = request.body["mother_birth_reg_id"];
      if (lib.isBRIdValid(mother_birth_id) === false) {
        response.json({
          code: 3015,
          message: "mother birth registration id is invalid",
        });
        return 0;
      } else {
        data.mother_birth_reg_id = mother_birth_id;
      }
    }

    if (lib.fieldFind(["mother_national_id"], request.body) === true) {
      let mother_nid = request.body["mother_national_id"];
      if (lib.isNIdValid(mother_nid) === false) {
        response.json({ code: 3013, message: "mother national id is invalid" });
        return 0;
      } else {
        data.mother_national_id = mother_nid;
      }
    }

    let person_birth_reg_id = request.body["person_birth_reg_id"];

    db.updatePersonData(person_birth_reg_id, data, (status) => {
      if (status === true) {
        response.json({
          code: 2002,
          message: "person data is updated",
        });
      } else if (status === "error") {
        response.json({
          code: 3004,
          message: "some errors has been occured",
        });
      }
    });
  }
);

module.exports = router;
