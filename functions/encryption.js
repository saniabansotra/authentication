const bcrypt = require("bcryptjs");

//this will be used when signup
const encrytPassword = async (originalpassword) => {
  try {
    let encryptedPassword = await bcrypt.hash(originalpassword, 10);
    return encryptedPassword;
  } catch (error) {
    console.log(error);
  }
};

//this will be used on login
const verifyPassword = async (inputpassword, encryptedPassword) => {
  try {
    const checkPass = await bcrypt.compare(inputpassword, encryptedPassword);
    console.log(checkPass);
    return checkPass;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { encrytPassword, verifyPassword };
