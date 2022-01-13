const lib = require("../Lib/index");

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

module.exports={
    loginRequiredField,
    validateUsername,
    validatePassword
}
