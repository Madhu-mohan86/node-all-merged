"use strict";

const path=require('path')


exports.contactform=(request,response)=>{


    console.log(request.method)
    response.sendFile(path.join(__dirname,"../views/contact.html"));
}
