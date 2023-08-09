const User = require("../models/userModel");
const Message = require("../models/messageModel");
const asyncHandler = require("express-async-handler");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

exports.sign_up_get = asyncHandler(async (req, res) => {
  res.render("sign-up", {title: "Sign up page"});
});

exports.sign_up_post = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  try {
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) {
        return next(err);
      } else {
        const user = new User({
          name: req.body.name,
          surname: req.body.surname,
          email: req.body.email,
          password: hashedPassword,
          isPro: false,
        });
        if (!errors.isEmpty()) {
          res.render("sign-up", {
            errors: errors,
            user: user,
            title: "errors occurred.",
          });
          return;
        } else {
          const emailExists = await User.findOne({ email: req.body.email })
            .collation({ locale: "en", strength: 2 })
            .exec();
          if (emailExists) {
            res.render("sign-up", {
              user: user,
              title: "Email already used. Choose a different email or log in to your account.",
            });
          } else {
            await user.save();
            res.redirect("/");
          }
        }
      }
    });
  } catch (error) {
    return next(error);
  }
});

exports.log_in_get = asyncHandler(async (req, res) => {
  res.render("log-in", {title: "Log in"});
});

exports.log_out_get = asyncHandler(async (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

exports.become_pro_get = asyncHandler(async (req, res) => {
  res.render("become-pro", {title: "Become pro"});
});

exports.become_pro_post = asyncHandler(async (req, res, next) => {
  if (req.body.password == process.env.SECRET_PASSWORD) {
    console.log("Password hacked");
  }
});