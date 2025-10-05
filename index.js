const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override")

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded ({extened: true}))
app.use(methodOverride("_method"));

main()
.then(() =>{
  console.log("connection sucessful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Whatsapp');

}
//INDEX ROUTE
app.get("/chats" ,async( req , res) =>{
  let chats = await Chat.find();
  res.render("index.ejs", {chats});
})

//NEW CHAT ROUTE
app.get("/chats/new", (req, res) => {
  res.render("new.ejs")
})

//CREATE ROUTE
app.post("/chats",(req, res)=>{
  let {from , msg, to} = req.body;
  let newChat = new Chat ({
    from : from,
    msg: msg,
    to: to,
    created_at: new Date()
  })
  newChat.save()
  .then((res) => 
    {console.log("chat was saved")})
  .catch((err) =>{
    console.log(err)
  })
  res.redirect("/chats")
})

app.get("/",(req, res) => {
  res.send("app is working");
})

//EDIT ROUTE
app.get("/chats/:id/edit", async(req,res)=>{
  let {id} = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs", {chat});

})

//UPDATE ROUTE
app.put("/chats/:id", async(req, res) => {
  let{id} = req.params;
  let{ msg: newMsg} = req.body;
  let updatedChat = await Chat.findByIdAndUpdate(id, {msg: newMsg}, {runValidators: true, new: true}) ;
  console.log(updatedChat)

  res.redirect("/chats")
});

//DESTROY ROUTE
app.delete("/chats/:id" , async(req, res)=>{
  let {id} = req.params;
  let deletedChat = await Chat.findByIdAndDelete(id);
  res.redirect("/chats");
})

app.listen(8080, () =>{
  console.log("Server is running on port  8080");
})


