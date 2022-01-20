const router = require("express").Router();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const middleware = require("../../Middlewares/index");
const db = require("../../Db/index");
const process = dotenv.config({path:"./.env"});

router.post(
  "/login",
  [
    middleware.loginRequiredField,
    middleware.validateUsername,
    middleware.validatePassword,
  ],
  (request, response) => {
    let username = request.body["username"];
    let password = request.body["password"];
    
    db.checkPassword(username, password, (status) => {

      // if username and password found then status prameter is a object like status={userid:"xxxxxxxxxxxxxxxx"}
      if (typeof status === "object" && status !== null) {
        
        let access_token = jwt.sign(
          { userid: status.userid },
          process.parsed["SECRET_KEY"],
          {
            expiresIn: process.parsed["TOKEN_VALIDITY"],
          }
        );

        response.json({
          code: "2000",
          message: "login is successsful",
          data: { access_token: access_token },
        });

      }
      // if username and password are not found then status prameter is a boolean like status=false
      else if (status === false) {
        response.json({ code: "3003", message: "credantials are invalid" });
      }
      // if some errors occured then status prameter is a string like status="error"
      else if (status === "error") {
        response.json({
          code: "3004",
          message: "some errors has been occured",
        });
      }
    });
  }
);

module.exports = router;
