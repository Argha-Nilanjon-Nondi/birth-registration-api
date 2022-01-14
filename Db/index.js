const mongoose = require("mongoose");
const crypto = require("crypto");

function rand_number() {
  let min = 10000000;
  let max = 99999999;
  let rand = Math.floor(Math.random() * (max - min + 1)) + min;
  return rand.toString();
}

uri = "mongodb://localhost:27017/birthDB";
mongoose.connect(uri);
let reg_id_length = 17;
let nation_id_length = 10;
const birthCollectionSchema = mongoose.Schema({
  person_name: { type: String, uppercase: true, minLength: 5 },
  person_birth_reg_id: {
    type: String,
    minLength: reg_id_length,
    maxLength: reg_id_length,
  },
  person_birth_date: { type: Date },
  person_birth_no: { type: Number },
  person_birth_place: { type: String },
  reg_issue_no: { type: Number },
  reg_issue_date: {
    type: Date,
    default: new Date().toISOString().slice(0, 10),
  },
  person_gender: { type: String },
  father_name: { type: String, uppercase: true, minLength: 5 },
  mother_name: { type: String, uppercase: true, minLength: 5 },
  father_birth_reg_id: {
    type: String,
    minLength: reg_id_length,
    maxLength: reg_id_length,
  },
  father_national_id: {
    type: String,
    minLength: nation_id_length,
    maxLength: nation_id_length,
  },
  mother_birth_reg_id: {
    type: String,
    minLength: reg_id_length,
    maxLength: reg_id_length,
  },
  mother_national_id: {
    type: String,
    minLength: nation_id_length,
    maxLength: nation_id_length,
  },
});

const birthRegCollection = mongoose.model(
  "peopleBirthInfos",
  birthCollectionSchema
);

const addPersonData = (data, callback) => {
  let reg_issue_no;
  birthRegCollection.findOne(
    {},
    {},
    { sort: { _id: -1 } },
    function (err, post) {
      if (post === null) {
        reg_issue_no = 1;
      }
      if (post !== null) {
        reg_issue_no = post["reg_issue_no"] + 1;
      }
      let new_res_id = rand_number() + "0" + rand_number();

      data["person_birth_reg_id"] = new_res_id;
      data["reg_issue_no"] = reg_issue_no;
      const row = new birthRegCollection(data);
      row.save((err, row) => {
        if (err) {
          console.log(err);
          callback(false);
          return 0;
        }
        callback(true);
        return 0;
      });
    }
  );
};

const updatePersonData = (birth_reg_id, data, callback) => {
  birthRegCollection.findOneAndUpdate(
    { person_birth_reg_id: birth_reg_id },
    data,
    function (err, row) {
      if (err) {
        callback(false);
        return 0;
      } else {
        callback(true);
        return 0;
      }
    }
  );
};

const getUserProfile = (birth_reg_id, callback) => {
  birthRegCollection.findOne(
    { person_birth_reg_id: birth_reg_id },
    { _id: 0, __v: 0 },
    function (err, row) {
      if (err) {
        console.log(err);
        callback(false);
        return 0;
      }
      callback(row);
      return 0;
    }
  );
};

let a = rand_number();
let data = {
  person_name: "Person Name " + a,
  person_birth_date: "2005-1-10",
  person_birth_no: 2,
  person_birth_place: "Jhenaidha , Khulna , Bangladesh ",
  person_gender: "male",
  father_name: "Father Name " + a,
  mother_name: "Mother Name " + a,
  father_birth_reg_id: "01234527890123452",
  father_national_id: "0123456789",
  mother_birth_reg_id: "01234527890123452",
  mother_national_id: "0123452789",
};
// addPersonData(data, (data) => {
//   console.log(data);
// });

// getUserProfile((birth_reg_id = "17848646035472649"), (data) => {
//   console.log(data);
// });

// updatePersonData("17848646035472649",{person_name:"Argha nondi"}, (data) => {
//   console.log(data);
// });

const userCollectionSchema = mongoose.Schema({
  userid: { type: String, unique: true },
  username: { type: String, unique: true },
  usertype: { type: String, lowercase: true },
  password: { type: String },
});

const userCollection = mongoose.model("users", userCollectionSchema);

const addUser = (data, callback) => {
  const rn = rand_number() + rand_number() + rand_number();
  const hash = crypto
    .createHash("sha256")
    .update(data["password"])
    .digest("hex");
  data["password"] = hash;
  data["userid"] = rn;
  const row = new userCollection(data);
  row.save((err, row) => {
    if (err) {
      callback("error");
      return 0;
    }
    callback(true);
    return 0;
  });
};

const checkPassword = (username, password, callback) => {
  const hash = crypto.createHash("sha256").update(password).digest("hex");
  userCollection.findOne(
    { username: username, password: hash },
    { __v: 0, _id: 0, username: 0, usertype: 0, password: 0 },
    function (err, row) {
      if(err){
        callback("error");
        return 0;
      }
      if (row === null) {
        callback(false);
        return 0;
      }
      callback(row);
      return 0;
    }
  );
};

// checkPassword("argha_nilanjon_nondi","56665'';'[][]",(data)=>{
//   console.log(data)
// })

// addUser({username:"argha_nilanjon",usertype:"admin",password:"avunix9143"},(data)=>{
//   console.log(data)
// })

module.exports = { addUser, addPersonData, checkPassword };
