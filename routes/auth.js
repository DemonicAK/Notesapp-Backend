const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const dotenv = require("dotenv");
dotenv.config();

const JWT_SECRET = process.env.SECRET_KEY;

// console.log(JWT_SECRET);

// Route 1 : Create a user using: POST "api/auth/createuser". Doesn't require auth
router.post(
  "/createuser",
  [
    body("name").isLength({ min: 3 }),
    // email must be an email
    body("email").isEmail(),
    // password must be at least 5 chars long
    body("password").isLength({ min: 5 }),
  ],

  async (req, res) => {
    // console.log(req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // const newUser = new User({
    //   name: req.body.name,
    //   email: req.body.email,
    //   password: req.body.password,
    // });
    let salt = bcrypt.genSaltSync(10);
    let secpassword = await bcrypt.hash(req.body.password, salt);
    try {
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secpassword,
      });
      // res.send(user);
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, JWT_SECRET);
      // console.log(token);
      res.json({ token });
    } catch (err) {
      console.log(err);
      res.json({ error: "Some error occured" });
    }
    // .then((user) => res.json(user))
    // .catch((err) => {
    //   console.log(err);
    //   res.json({ error: "Some error occured" });
    // });

    // User.save();
    // res.send(req.body);
    //   res.json(obj);
  }
);

// Route 2 : Create a user using: POST "api/auth/loginuser". Doesn't require login
router.post(
  "/loginuser",

  [
    // email must be an email
    body("email", "enter valid email").isEmail(),
    // password must be at least 5 chars long
    body("password", "enter password").exists(),
  ],

  async (req, res) => {
    // console.log(req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email: req.body.email });

      if (!user) {
        return res.status(400).json({ error: "Sorry wrong credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);

      if (!passwordCompare) {
        return res.status(400).json({ error: "Sorry wrong credentials" });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(payload, JWT_SECRET);
      // console.log(token);
      res.json({ token });
    } catch (err) {
      console.log(err);
      res.json({ error: "Some error occured" });
    }
  }
);

// Route 3 : Get the user using: POST "api/auth/getuser". require login
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    // console.log(user);
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Some error occured");
  }
});

module.exports = router;
