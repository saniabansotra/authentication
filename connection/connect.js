const TWILIO_SERVICE_ID = "VA2e7efb3f02c2cc8b225db6ead9e45cb4"; //from the services->verify page
const TWILIO_ACCOUNT_ID = "ACc7ddb9563c9bf1cfb879df898b2ea121"; // account settings
const TWILIO_AUTH_TOKEN = "9a89d76b92b6509975a23f32ea71a0af"; // account settings below

const client = require("twilio")(TWILIO_ACCOUNT_ID, TWILIO_AUTH_TOKEN);

const sendLoginOtp = (userphone) => {
  if (!userphone)
    return {
      succes: false,
      error: "Phone Number Missing",
    };

  client.verify
    .services(TWILIO_SERVICE_ID)
    .verifications.create({
      to: userphone,
      channel: "sms",
    })
    .then((verification) => {
      return {
        success: true,
        status: verification.status,
      };
    })
    .catch((err) => {
      console.log(err);
      if (err.code === 60200)
        return {
          success: false,
          error: "Invalid Parameter",
        };
      else if (err.code === 60203)
        return {
          success: false,
          error: "Max Send attempts reached",
        };
      else if (err.code === 60212)
        return {
          success: false,
          error: "Too many concurrent requests for phone number",
        };
      else
        return {
          success: false,
          error: "Server Issue, Try Again Later!",
        };
    });
};
const verifyOtp = async (phonenum, code) => {
  try {
    const verification_check = await client.verify
      .services(TWILIO_SERVICE_ID)
      .verificationChecks.create({
        to: phonenum,
        code: code,
      });
    console.log(verification_check.status);
    if (verification_check.status === "approved") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
module.exports = { sendLoginOtp, verifyOtp };
