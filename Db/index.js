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
let vaccine_id_length = 13;

const birthCollectionSchema = mongoose.Schema({
  person_name: { type: String, uppercase: true, minLength: 5 },
  person_birth_reg_id: {
    type: String,
    minLength: reg_id_length,
    maxLength: reg_id_length,
  },
  person_birth_vaccine_id: {
    type: String,
    minLength: vaccine_id_length,
    maxLength: vaccine_id_length,
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
          callback("error");
          return 0;
        }
        callback(true);
        return 0;
      });
    }
  );
};

const isVaccineIdExist = (person_birth_vaccine_id, callback) => {
  birthRegCollection.countDocuments(
    { person_birth_vaccine_id: person_birth_vaccine_id },
    function (err, count) {
      if (err) {
        callback("error");
        return 0;
      }
      if (count === 0) {
        callback(false);
        return 0;
      }
      callback(true);
      return 0;
    }
  );
};


const isVaccineIdExistSYC =async (person_birth_vaccine_id) => {
  let count = await birthRegCollection.countDocuments({ person_birth_vaccine_id: person_birth_vaccine_id });
  if(count===0){
    return false;
  }
  return true;
  }

  isVaccineIdExistSYC("890898989789")
const isBirthRegIdExist = (person_birth_reg_id, callback) => {
  birthRegCollection.countDocuments(
    { person_birth_reg_id: person_birth_reg_id },
    function (err, count) {
      if (err) {
        callback("error");
        return 0;
      }
      if (count === 0) {
        callback(false);
        return 0;
      }
      callback(true);
      return 0;
    }
  );
};

const updatePersonData = (birth_reg_id, data, callback) => {
  birthRegCollection.findOneAndUpdate(
    { person_birth_reg_id: birth_reg_id },
    data,
    function (err, row) {
      if (err) {
        callback("error");
        return 0;
      } else {
        callback(true);
        return 0;
      }
    }
  );
};

const getPersonProfileByRegID = (birth_reg_id, callback) => {
  birthRegCollection.findOne(
    { person_birth_reg_id: birth_reg_id },
    { _id: 0, __v: 0 },
    function (err, row) {
      if (err) {
        callback("error");
        return 0;
      }
      callback(row);
      return 0;
    }
  );
};

const getPersonProfileByVaccID = (vaccine_id, callback) => {
  birthRegCollection.findOne(
    { person_birth_vaccine_id: vaccine_id },
    { _id: 0, __v: 0 },
    function (err, row) {
      if (err) {
        callback("error");
        return 0;
      }
      callback(row);
      return 0;
    }
  );
};

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
      if (err) {
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

const checkUserType = (userid, usertype, callback) => {
  userCollection.countDocuments(
    { userid: userid, usertype: usertype },
    function (err, count) {
      if (err) {
        callback("error");
        return 0;
      }
      if (count === 0) {
        callback(false);
        return 0;
      }
      callback(true);
      return 0;
    }
  );
};

module.exports = {
  addUser,
  addPersonData,
  updatePersonData,
  checkPassword,
  checkUserType,
  isVaccineIdExist,
  isVaccineIdExistSYC,
  isBirthRegIdExist,
  getPersonProfileByRegID,
  getPersonProfileByVaccID,
};
