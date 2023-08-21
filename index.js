const express = require("express");
const app = express();
const handlerequest = require("./controller/homecontroller");
const errorlistener = require("./controller/errorcontroller");
const expressEjsLayouts = require("express-ejs-layouts");
const bodyparser = require("body-parser");
const path=require('path')

const mongodb = require("mongodb");

const dburl = "mongodb://localhost:27017/";

const dbname = "testing";

console.log(dburl);

async function connectToDatabase(strrcvddata) {
  try {
    const client = await mongodb.MongoClient.connect(dburl);
    console.log("Connected to the database");

    const db = client.db(dbname);

    const collection = db.collection("insidetstng");
    try {
      const test = await collection.insertOne({strrcvddata});

      const insertedId = test.insertedId;

      const insertedDocument = await collection.findOne({ _id: insertedId });
      console.log("Inserted Document:", insertedDocument);
    } catch (error) {
      console.log("the error is", error);
    }
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

connectToDatabase();

app.use(expressEjsLayouts);

app.use(bodyparser.urlencoded({ extended: false }));

app.use(bodyparser.json());

app.get("/contact", handlerequest.contactform);

app.post("/contact",(request,response)=>{
    
    console.log(request.method)

    console.log(request.body)
    
    const storeddata=request.body;

    connectToDatabase(storeddata);

});

app.set("port", process.env.PORT || 3000);

app.set("view engine", "ejs");

app.listen(app.get("port"), () => {
  console.log(`server running on loclhost portno:${app.get("port")}`);
});
