const express = require("express");
const app = express();
app.use(express.json());
const cookies = require("cookie-parser");

app.use(cookies());
const verifytoken = require("./tokens/verifytoken");
const generatetoken = require("./tokens/generatetoken");
require("dotenv").config();
app.get("/public", () => {
  try {
    return res.json({ success: true, message: "hello world from public" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ sucess: false, error: error.message });
  }
});

app.post("/api/login", (req, res) => {
  try {
    console.log(req.body);
    let userid = req.body.userid;
    if (req.body.password === 1234) {
      const token = generatetoken(userid);
      console.log(token);
      res.cookie("web_tk", token);
      return res.json({ success: true, message: "successfull Generated" });
    } else {
      return res
        .status(400)
        .json({ success: false, error: "Incorrect credentials" });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
});
const middlewarefn = (req, res, next) => {
  if (verifytoken(req.cookies.web_tk)) {
    const userinfo = verifytoken(req.cookies.web_tk);
    console.log(userinfo);

    next();
  } else {
    return res.status(400).json({ success: false, error: "Unauthorized" });
  }
};
app.get("/getcookie", middlewarefn, (req, res) => {
  try {
    return res.json({ success: true, message: "fully authorized" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
});

app.listen(5000, () => {
  console.log("Server is running at port 5000");
});
