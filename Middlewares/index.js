const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

const db = require("../Db/index");
const lib = require("../Lib/index");
const process = dotenv.config({ path: "./.env" });

const loginRequiredField = (request, response, next) => {
  let fieldList = ["username", "password"];
  if (lib.fieldFind(fieldList, request.body) === false) {
    response.json({ code: 3000, message: "required field is not found" });
  } else {
    next();
  }
};

const validateUsername = (request, response, next) => {
  let username = request.body["username"];
  if (lib.isUsernameValid(username) === false) {
    response.json({ code: 3001, message: "Username format is invalid" });
  } else {
    next();
  }
};

const validatePassword = (request, response, next) => {
  let password = request.body["password"];
  if (lib.isPasswordValid(password) === false) {
    response.json({ code: 3002, message: "Password format is invalid" });
  } else {
    next();
  }
};

const authoRequiredField = (request, response, next) => {
  let fieldList = ["x-api-key"];
  if (lib.fieldFind(fieldList, request.headers) === false) {
    response.json({
      code: 3005,
      message: "required token is not in the headers",
    });
  } else {
    next();
  }
};

const validateToken = (request, response, next) => {
  let access_token = request.headers["x-api-key"];
  jwt.verify(access_token, process.parsed["SECRET_KEY"], (err, data) => {
    if (err) {
      response.json({
        code: 3006,
        message: "token is invalid",
      });
    } else {
      next();
    }
  });
};

const validateAdminType = (request, response, next) => {
  let access_token = request.headers["x-api-key"];
  let decoded = jwt.decode(access_token);
  let userid = decoded.userid;

  db.checkUserType(userid,usertype="admin", (status) => {
    if (status===true) {
      next();
    } else if (status === false) {
       response.json({ code: "3007", message: "you are not admin" });
    } else if (status === "error") {
      response.json({
        code: "3004",
        message: "some errors has been occured",
      });
    }
  });
};

const personAddRequiredField = (request, response, next) => {
  let fieldList = [
    "person_name",
    "person_birth_date",
    "person_birth_no",
    "person_birth_place",
    "person_gender",
    "person_birth_vaccine_id",
    "father_name",
    "mother_name",
    "father_birth_reg_id",
    "father_national_id",
    "mother_birth_reg_id",
    "mother_national_id",
  ];
  if (lib.fieldFind(fieldList, request.body) === false) {
    response.json({ code: 3000, message: "required field is not found" });
  } else {
    next();
  }
};

const validatePersonName=(request,response,next)=>{
  let  person_name= request.body["person_name"];
  if (lib.isNameValid(person_name) === false) {
    response.json({ code: 3009, message: "person name is invalid" });
  } else {
    next();
  }
}

const validatePersonBirthVaccineID = (request, response, next) => {
  let person_birth_vaccine_id = request.body["person_birth_vaccine_id"];
  if (lib.isBVIdValid(person_birth_vaccine_id) === false) {
    response.json({ code: 3016, message: "person birth vaccine id is invalid" });
  } else {
    next();
  }
};

const validatePersonGenderType = (request, response, next) => {
  let person_gender = request.body["person_gender"];
  if (lib.isGenderTypeValid(person_gender) === false) {
    response.json({ code: 3017, message: "person gender type is invalid" });
  } else {
    next();
  }
};

const validatePersonBirthNo = (request, response, next) => {
  let person_birth_no = request.body["person_birth_no"];
  if (lib.isBirthNoValid(person_birth_no) === false) {
    response.json({ code: 3018, message: "person birth no is invalid" });
  } else {
    next();
  }
};

const validatePersonBirthDate = (request, response, next) => {
  let person_birth_date = request.body["person_birth_date"];
  if (lib.isDateValid(person_birth_date) === false) {
    response.json({ code: 3019, message: "person birth date is invalid" });
  } else {
    next();
  }
};

const validateFatherName = (request, response, next) => {
  let father_name = request.body["father_name"];
  if (lib.isNameValid(father_name) === false) {
    response.json({ code: 3010, message: "father name is invalid" });
  } else {
    next();
  }
};

const validateMotherName = (request, response, next) => {
  let mother_name = request.body["mother_name"];
  if (lib.isNameValid(mother_name) === false) {
    response.json({ code: 3011, message: "mother name is invalid" });
  } else {
    next();
  }
};

const validateFatherNID = (request, response, next) => {
  let father_nid= request.body["father_national_id"];
  if (lib.isNIdValid(father_nid) === false) {
    response.json({ code: 3012, message: "father national id is invalid" });
  } else {
    next();
  }
};

const validateMotherNID = (request, response, next) => {
  let mother_nid = request.body["mother_national_id"];
  if (lib.isNIdValid(mother_nid) === false) {
    response.json({ code: 3013, message: "mother national id is invalid" });
  } else {
    next();
  }
};

const validateFatherBirthID = (request, response, next) => {
  let father_birth_id = request.body["father_birth_reg_id"];
  if (lib.isBRIdValid(father_birth_id) === false) {
    response.json({ code: 3014, message: "father birth registration id is invalid" });
  } else {
    next();
  }
};

const validateMotherBirthID = (request, response, next) => {
  let mother_birth_id = request.body["mother_birth_reg_id"];
  if (lib.isBRIdValid(mother_birth_id) === false) {
    response.json({ code: 3015, message: "mother birth registration id is invalid" });
  } else {
    next();
  }
};

const validateVaccinIdExist=(request,response,next)=>{
   let person_birth_vaccine_id = request.body["person_birth_vaccine_id"];
   db.isVaccineIdExist(person_birth_vaccine_id,(status)=>{
     if (status === false) {
       next();
     } else if (status === true) {
       response.json({ code: 3020, message: "vaccine id is already exist" });
     } else if (status === "error") {
       response.json({
         code: "3004",
         message: "some errors has been occured",
       });
     }
   })
}

const validateBirthRegIdExist = (request, response, next) => {
  let person_birth_reg_id = request.body["person_birth_reg_id"];
  db.isBirthRegIdExist(person_birth_reg_id, (status) => {
    if (status === true) {
      next();
    } else if (status === false) {
      response.json({ code: 3022, message: "person birth registration id is not found" });
    } else if (status === "error") {
      response.json({
        code: "3004",
        message: "some errors has been occured",
      });
    }
  });
};

const personUpdateRequiredField = (request, response, next) => {
  let fieldList = [
    "person_birth_reg_id",
  ];
  if (lib.fieldFind(fieldList, request.body) === false) {
    response.json({ code: 3000, message: "required field is not found" });
  } else {
    next();
  }
};

const validatePersonBirthID = (request, response, next) => {
  let person_birth_id = request.body["person_birth_reg_id"];
  if (lib.isBRIdValid(person_birth_id) === false) {
    response.json({
      code: 3021,
      message: "person birth registration id is invalid",
    });
  } else {
    next();
  }
};


module.exports = {
  loginRequiredField,
  validateUsername,
  validatePassword,
  authoRequiredField,
  validateToken,
  validateAdminType,
  personAddRequiredField,
  validatePersonName,
  validateFatherName,
  validateMotherName,
  validateFatherNID,
  validateMotherNID,
  validateFatherBirthID,
  validateMotherBirthID,
  validatePersonBirthDate,
  validatePersonBirthVaccineID,
  validatePersonGenderType,
  validatePersonBirthNo,
  validateVaccinIdExist,
  personUpdateRequiredField,
  validatePersonBirthID,
  validateBirthRegIdExist,
};
