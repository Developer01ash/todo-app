const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const passport = require("passport");

exports.register = async function (req, res) {
  try {
    const { email, username, password } = req.body;
    const findUser = await User.findOne({ email });
    if (findUser && findUser._id) {
      return res.status(403).json({
        status: 403,
        error: `Sorry, already a user with the email: ${email}`,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email: email,
      username: username,
      password: hashedPassword,
    });

    await newUser.save();
    return res
      .status(200)
      .json({ status: 200, message: "Successfully registered." });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Registration failed.",
      error: err.message,
    });
  }
};
exports.login = async (req, res, next) => {
  try {
    passport.authenticate("local", async (err, user) => {
      if (err) {
        return res.status(401).json({ status: 401, error: err });
      }
      if (!user) {
        return res
          .status(422)
          .json({ status: 422, error: "Invalid credentials." });
      }

      if (user) {
        const token = jwt.sign(
          { id: user._id, email: user.email },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "1h" }
        );

        return res.status(200).json({
          msg: "Logged in Successfully.",
          success: true,
          token,
        });
      }
    })(req, res, next);
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Login failed.",
      error: error.message,
    });
  }
};

exports.logout = (req, res, next) => {
  try {
    req.logout(function (err) {
      if (err) {
        return res.send(err);
      }
      return res.status(200).json({
        msg: "Logout  Successfully.",
        success: true,
      });
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.message,
    });
  }
};
exports.profile = (req, res) => {
  try {
    const { user } = req;

    if (!user) {
      return res
        .status(401)
        .json({ message: "Unauthorized. User not authenticated." });
    }

    const { id, email } = user;

    res.json({
      message: "You made it to the secured profile",
      user: {
        id,
        email,
      },
    });
  } catch (error) {
    console.error("Error in profile route:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
