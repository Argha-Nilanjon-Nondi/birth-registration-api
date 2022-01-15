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
  if (lib.IsUsernameValid(username) === false) {
    response.json({ code: 3001, message: "Username format is invalid" });
  } else {
    next();
  }
};

const validatePassword = (request, response, next) => {
  let password = request.body["password"];
  if (lib.IsPasswordValid(password) === false) {
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
  
  db.checkUserType(userid,(status)=>{

    if (typeof status === "object" && status !== null) {
      if(status.usertype==="admin"){
        next()
      }
      else{
        response.json({ code: "3007", message: "you are not admin" });
      }
    }

    else if (status === false) {
      response.json({ code: "3008", message:"user is deleted" });
    }
    
    else if (status === "error") {
      response.json({
        code: "3004",
        message: "some errors has been occured",
      });
    }
  })
};

module.exports = {
  loginRequiredField,
  validateUsername,
  validatePassword,
  authoRequiredField,
  validateToken,
  validateAdminType,
};
