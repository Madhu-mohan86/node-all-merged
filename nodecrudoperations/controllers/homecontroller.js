const path = require("path");

module.exports = {
  gethomepage: (request, response) => {
    console.log(request.method);
    response.sendFile(path.join(__dirname,"../views/homepage.html"));
  },
  getuserpage:(request,response)=>{
    console.log(request.method);
    response.sendFile(path.join(__dirname,"../views/user.html"));
  },
  getloginpage:(request,response)=>{
    console.log(request.method);
    response.sendFile(path.join(__dirname,"../views/login.html"))
  }
};
