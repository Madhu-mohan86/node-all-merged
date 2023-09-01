const bcrypt = require("bcrypt");

const userschema = require("../models/usermodel");

module.exports = {
  postdetails: async (request, response) => {
    console.log(request.body);
    const hashedpassword = await bcrypt.hash(request.body.password, 10);
    const hasheduser = {
      name: request.body.name,
      email: request.body.email,
      password: hashedpassword,
    };
    console.log(hasheduser);
    var details = await userschema
      .create(hasheduser)
      .catch((error) => {
        console.log("the errors in creating the database", error);
      })
      const flashmesage=request.flash("success","account created successfully")
      response.render("thanks",{flashmessage:flashmesage});
  },
  loginchecker:async (request,response)=>{
    var details=await userschema.findOne({email:request.body.email})
    console.log(details);
    console.log(details.password)
    console.log(request.body.password)
    var checked=await bcrypt.compare(request.body.password,details.password)

    console.log(checked)
    if(checked){
        response.render("loginsuccess")
    }
    else{
        console.log("check your password")
    }
  },
  showdetails: async (request, response) => {
    var details = await userschema
      .find({})
      .catch("the errors in extracting the details");

    console.log(details);
    response.render("users", { users: details });
  },
  editdetails: async (request, response) => {
    let userid = request.params.id;
    var result = await userschema
      .findById(userid)
      .then((user) => {
        console.log(user);
        response.render("edit", { user: user });
      })
      .catch((error) => {
        console.log("the error is", error);
      });
  },
  updatedetails: async (request, response) => {
    let userid = request.params.id;
    let userupdateddetails = {
      name: request.body.name,
      email: request.body.email,
      password: request.body.password,
    };

    console.log(userupdateddetails);
    var result = await userschema
      .findByIdAndUpdate(userid, { $set: userupdateddetails })
      .catch((error) => {
        console.log("error was in update schema", error);
      });
  },
  deletedetails: async (request, response) => {
    let userid = request.params.id;
    console.log(userid)
    var result = await userschema.findByIdAndRemove(userid).catch((error) => {
      console.log(error);
    });
    console.log("the deleted details are", request);
  },
};
