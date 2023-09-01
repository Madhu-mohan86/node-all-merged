const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const connectFlash = require("connect-flash");
const router = express.Router(); 

const homepageroute=require('./routes/homerouter')

const userroute=require('./routes/userrouter')

const homepagecontroller = require("./controllers/homecontroller");
const usercontroller = require("./controllers/usercontroller");

mongoose.connect("mongodb://localhost:27017/", { useNewUrlParser: true });
mongoose.connection.once("open", (error) => {
  if (error) {
    console.log("connecting error with database");
  } else {
    console.log("connection was successful");
  }
});

app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

app.use(cookieParser("007forcookie"));

app.use(
  expressSession({
    secret: "007forcookie",
    cookie: {
      maxAge: 4000000,
    },
    resave: false,
    saveUninitialized: false,
  })
);

app.use(connectFlash());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view engine", "ejs");

app.use(router); 

router.use('/',homepageroute)

router.use('/user',userroute)


router.get("/login", homepagecontroller.getloginpage);
router.post("/login",usercontroller.loginchecker);
router.get("/viewusers", usercontroller.showdetails);
router.get("/user/:id/edit", usercontroller.editdetails);
router.put("/user/:id/update", usercontroller.updatedetails);
router.delete("/user/:id/delete", usercontroller.deletedetails);

app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), () => {
  console.log(`server running on ${app.get("port")}`);
});
