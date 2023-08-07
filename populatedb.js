#! /usr/bin/env node

  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  
  const User = require("./models/userModel");
  const Message = require("./models/messageModel");
  
  const users = [];
  const messages = [];
  
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false); // Prepare for Mongoose 7
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createUsers();
    await createMessages();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  
  // We pass the index to the ...Create functions so that, for example,
  // genre[0] will always be the Fantasy genre, regardless of the order
  // in which the elements of promise.all's argument complete.
  async function userCreate(index, name, surname, email, password, isPro) {
    const user = new User({ name: name, surname: surname, email: email, password: password, isPro: isPro });
    await user.save();
    users[index] = user;
    console.log(`Added user: ${name} ${surname}`);
  }
  
  async function messageCreate(index, title, text, author, timestamp) {
    const messagedetail = {
        title: title,
        text: text,
        author: author,
        timestamp: timestamp,
    };
  
    const message = new Message(messagedetail);
    await message.save();
    messages[index] = message;
    console.log(`Added message: ${title}`);
  }
  
  async function createUsers() {
    console.log("Adding users");
    await Promise.all([
        userCreate(0, "Bart", "kox", "koksiarz@2115.com", "dupa.8", true),
        userCreate(1, "Amadeus", "mozart", "essiarz@2115.com", "dupa.8", true),
        userCreate(2, "Ludwig", "van Beethoven", "jadwiga@2115.com", "dupa.8", true),
    ]);
  }
  
  async function createMessages() {
    console.log("Adding messages");
    await Promise.all([
        messageCreate(
        0,
        "ale essunia wiadomosc",
        "Large frame double-action revolver featuring a full length under-barrel ejection-rod lug and six round cylinder.",
        users[1],
        Date.now()
      ),
      messageCreate(
        1,
        "essa serwerek",
        "aksdfjaslkf asddfjsaklf sadfjsdlk ",
        users[2],
        Date.now()
      ),
      messageCreate(
        2,
        "mashallah mashallah brothers",
        "geogre floyd just converrted to islam ",
        users[2],
        Date.now()
      ),
      messageCreate(
        3,
        "askdlfj aklsfj aslkf",
        "asdfklja slfksdaj flakj flsdjflask asddfjsaklf sadfjsdlk ",
        users[1],
        Date.now()
      ),
      messageCreate(
        4,
        "gruba wiadomosc",
        "KASLJDFLKAD FKLJASDLKF JSFASK LJFLSJFASLK.!!! ",
        users[1],
        Date.now()
      ),
    ]);
  }
  