const Message = require("../models/messageModel");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.create_message_get = asyncHandler(async (req, res) => {
  res.render("create-message", { title: "Create a message" });
});

exports.messages_get = asyncHandler(async (req, res) => {
  let allMessages = [];
  if (res.locals.currentUser) {
    if (res.locals.currentUser.isPro) {
        allMessages = await Message.find().populate("author").exec();
    } else {
        allMessages = await Message.find().select("-author").exec();
    }
    res.render("messages", { title: "Messages", messages: allMessages });
  } else {
    res.render("messages", { title: "Log in in order to see the messages." });
  }
});
