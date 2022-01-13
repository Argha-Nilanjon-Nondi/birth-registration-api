function fieldFind(fieldList, object) {
  for (field of fieldList) {
    if (object[field] === undefined) {
      return false;
    }
  }
  return true;
}

function IsUsernameValid(username) {
  let disAllowCharList = [" ", "#", "%", "^", "*", "$"]; // these characters are not allowed
  let usernameLength=12;// username must be minimum 12 character long
  if (username.length === 0) {
    return false;
  }
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

function IsPasswordValid(password) {
  let disAllowCharList = [" "]; // these characters are not allowed
  let passwordLength = 8; // Password must be minimum 8 character long
  if (password.length === 0) {
    return false;
  }
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

module.exports={
    fieldFind,
    IsUsernameValid,
    IsPasswordValid
}
