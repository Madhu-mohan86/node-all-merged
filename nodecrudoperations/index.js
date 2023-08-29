const express = require("express");

const app = express();

const mongoose = require("mongoose");

const homepagecontroller = require("./controllers/homecontroller");

const usercontroller=require('./controllers/usercontroller');

const bodyParser = require("body-parser");

const methodoverride=require("method-override")

const router=express.Router()

mongoose.connect("mongodb://localhost:27017/", { useNewUrlParser: true });

mongoose.connection.once("open", (error) => {
  if (error) {
    console.log("connecting error with database");
  } else {
    console.log("connection was successful");
  }
});

app.use(methodoverride("_method",{
  methods:["POST","GET"]
}))

app.use(bodyParser.urlencoded({extended:true}))

app.use(bodyParser.json())

app.set("view engine","ejs")

app.get("/", homepagecontroller.gethomepage);

app.get("/user",homepagecontroller.getuserpage);

app.post("/user",usercontroller.postdetails)

app.get("/viewusers",usercontroller.showdetails)

app.get("/user/:id/edit",usercontroller.editdetails)

app.put("/user/:id/update",usercontroller.updatedetails)

app.delete("/user/:id/delete",usercontroller.deletedetails)

app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), () => {
  console.log(`server running on ${app.get("port")}`);
});
