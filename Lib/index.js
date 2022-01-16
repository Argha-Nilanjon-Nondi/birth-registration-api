function fieldFind(fieldList, object) {
  for (field of fieldList) {
    if (object[field] === undefined || object[field] == "") {
      return false;
    }
  }
  return true;
}

function isLetter(char) {
  let code = char.charCodeAt(0);
  if (code >= 65 && code <= 90) {
    return true;
  }
  if (code >= 97 && code <= 122) {
    return true;
  }
  return false;
}

function isUsernameValid(username) {
  let disAllowCharList = [" ", "#", "%", "^", "*", "$"]; // these characters are not allowed
  let usernameLength = 12; // username must be minimum 12 character long
  for (char of disAllowCharList) {
    if (username.includes(char) === true) {
      return false;
    }
  }
  if (username.length < usernameLength) {
    return false;
  }
  return true;
}

function isPasswordValid(password) {
  let disAllowCharList = [" "]; // these characters are not allowed
  let passwordLength = 8; // Password must be minimum 8 character long
  for (char of disAllowCharList) {
    if (password.includes(char) === true) {
      return false;
    }
  }
  if (password.length < passwordLength) {
    return false;
  }
  return true;
}

function isNameValid(name) {
  for (let i = 0; i < name.length; i++) {
    if (isLetter(name[i]) === false) {
      if (name[i] !== " ") {
        return false;
      }
    }
  }
  return true;
}

function isNIdValid(nid){
  if(nid.length!==10){
    return false;
  }
  if(isNaN(nid)===true){
    return false
  }
  return true;
}

function isBRIdValid(bid){
 if (bid.length !== 17) {
   return false;
 }
 if (isNaN(bid) === true) {
   return false;
 }
 return true;
}

function isBVIdValid(bvid) {
  if (bvid.length !== 13) {
    return false;
  }
  if (isNaN(bvid) === true) {
    return false;
  }
  return true;
}

function isDateValid(date){
  let status=new Date(date).toString();
return status !== "Invalid Date";
}

function isGenderTypeValid(type){
let allowGenderTypeList=["male","female","trans"]
return allowGenderTypeList.includes(type);
}

function isBirthNoValid(no){
 if (isNaN(no) === true) {
   return false;
 }
 return true;
}


module.exports = {
  fieldFind,
  isUsernameValid,
  isPasswordValid,
  isNameValid,
  isNIdValid,
  isBRIdValid,
  isBVIdValid,
  isDateValid,
  isGenderTypeValid,
  isBirthNoValid,
};
