const User = require('../models/userModel');
const Message = require('../models/messageModel');
const asyncHandler = require("express-async-handler");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

exports.sign_up_get = asyncHandler(async (req, res, next) => {
    res.render('sign-up');
});

exports.sign_up_post = asyncHandler(async (req, res, next) => {
    try {
        const userEmailExists = await User.find({email: req.body.email});
        if (userEmailExists) {
            throw new Error('E-mail already in use.');
        }
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
                await user.save();
                res.redirect('/');
            }
        });
    } catch (error) {
        return next(error);
    }
});