function rand_number(){
     let min = 10000000;
     let max = 99999999;
     let rand= Math.floor(Math.random() * (max - min + 1)) + min;
     return rand.toString();
}

const mongoose = require("mongoose");
uri = "mongodb://localhost:27017/birthDB";
mongoose.connect(uri);
let reg_id_length = 17;
let nation_id_length = 10;
const birthDBSchema = mongoose.Schema({
  person_name: { type: String, minLength: 5 },
  person_birth_reg_id: {
    type: String,
    minLength: reg_id_length,
    maxLength: reg_id_length,
  },
  person_birth_date: { type: Date },
  person_birth_no: { type: Number },
  person_birth_place: { type: String },
  reg_issue_no: { type: Number },
  reg_issue_date: { type: Date, default: new Date() },
  person_gender: { type: String },
  father_name: { type: String, minLength: 5 },
  mother_name: { type: String, minLength: 5 },
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

const birthRegDB = mongoose.model("peopleBirthInfos", birthDBSchema);

// const row = new birthRegDB({
//   person_name: "Person Name 2",
//   person_birth_reg_id: "01234527890123452",
//   person_birth_date: "2005-1-10",
//   person_birth_no: 2,
//   person_birth_place: "Jhenaidha , Khulna , Bangladesh ",
//   reg_issue_no: 2,
//   person_gender: "male",
//   father_name: "Father Name 2",
//   mother_name: "Mother Name 2",
//   father_birth_reg_id: "01234527890123452",
//   father_national_id: "0123456789",
//   mother_birth_reg_id: "01234527890123452",
//   mother_national_id: "0123452789",
// });

//  row.save((err, row) => {
//    if (err) {
//        console.log(err);
//      return false;
//    }
//    console.log(row);
//    return true;
//  });

const addPersonData = (data,callback) => {
  let reg_issue_no;
  birthRegDB.findOne({}, {}, { sort: { _id: -1 } }, function (err, post) {
    if (post === null) {
      reg_issue_no = 1;
    }
    if (post !== null) {
      reg_issue_no = post["reg_issue_no"] + 1;
    }
    let new_res_id=rand_number()+"0"+rand_number();

    data["person_birth_reg_id"]=new_res_id;
    data["reg_issue_no"]=reg_issue_no
     const row = new birthRegDB(data);
      row.save((err, row) => {
        if (err) {
          callback(false);
          return 0;
        }
        callback(true);
        return 0;
      });
  });
 
};

let a=rand_number()
let data={
       person_name: "Person Name "+a,
       person_birth_date: "2005-1-10",
       person_birth_no: 2,
       person_birth_place: "Jhenaidha , Khulna , Bangladesh ",
       person_gender: "male",
       father_name: "Father Name "+a,
       mother_name: "Mother Name "+a,
       father_birth_reg_id: "01234527",
       father_national_id: "0123456789",
       mother_birth_reg_id: "01234527890123452",
       mother_national_id: "0123452789",
     }
addPersonData(data,(data)=>{
  console.log(data)
});
