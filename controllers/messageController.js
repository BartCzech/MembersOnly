const Message = require("../models/messageModel");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.create_message_get = asyncHandler(async (req, res) => {
  res.render("create-message", { title: "Create a message", user: res.locals.currentUser });
});
exports.create_message_post = [
  body("title")
  .trim()
  .escape(),
  body("text")
  .trim()
  .escape(),
  asyncHandler(async (req, res) => {
    const newMessage = new Message({
      title: req.body.title,
      text: req.body.text,
      author: res.locals.currentUser,
      timestamp: Date.now(),
    });
    await newMessage.save();
    res.redirect("/messages");
  }),
];
  

exports.messages_get = asyncHandler(async (req, res) => {
  let allMessages = [];
  if (res.locals.currentUser) {
    if (res.locals.currentUser.isPro) {
        allMessages = await Message.find().populate("author").exec();
    } else {
        allMessages = await Message.find().select("-author").exec();
    }
    res.render("messages", { title: "Messages", messages: allMessages.reverse(), user: res.locals.currentUser });
  } else {
    res.render("messages", { title: "Log in in order to see the messages.", user: res.locals.currentUser });
  }
});
