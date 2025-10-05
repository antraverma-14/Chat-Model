const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main()
.then(() =>{
  console.log("connection sucessful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Whatsapp');

}
let allChats = [
  {
    from: "Arav",
    to: "Sumit",
    msg: "lets meet tonight!",
    created_at: new Date(),
  },
   {
    from: "Karan",
    to: "Kabir",
    msg: "Are u coming today ?",
    created_at: new Date(),
  },
   {
    from: "Priya",
    to: "Khushi",
    msg: "have u done your assignment",
    created_at: new Date(),
  },
   {
    from: "Shreya",
    to: "Riya",
    msg: "Good Morning",
    created_at: new Date(),
  },
   {
    from: "Tushar",
    to: "Ankita",
    msg: "Have a nice day",
    created_at: new Date(),
  }

]

Chat.insertMany(allChats);


