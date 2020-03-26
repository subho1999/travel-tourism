let express = require("express");
let app = express();
let ejs = require("ejs");
let body = require("body-parser");
let request = require("request");
let mongoose = require("mongoose");
// let dburl = "mongodb://localhost/travelDB";
let dburl= 'mongodb+srv://dbUser:mani1999@cluster0-xgsur.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;
db.on("error", console.error.bind(console, "Connnection Error -"));
db.once("open", () => {
  console.log("Database Connected");
});
var signupInfo, loginInfo, name, responses, placeSuggest;
var flag = 0;
let userSchema = mongoose.Schema({
  fname: String,
  lname: String,
  email: String,
  password: String
});
let placeSchema=mongoose.Schema({
    name:String,
    beach:String,
    hiking:String,
    history:String,
    nature:String,
    cities:String,
    sweet:String,
    spice:String,
    surprise:String,
    luxury:String,
    room_service:String,
    view:String
})
cities=[
      {
        name:"goa",
        beach:'op1',
        hiking:'op2',
        history:'op1',
        nature:'op1',
        cities:'op1',
        sweet:'op2',
        spice:'op1',
        surprise:'op1',
        luxury:'op1',
        room_service:'op1',
        view:'op1',
      },

      {
        name: "srinagar",
        beach: "op2",
        hiking: "op1",
        history: "op1",
        nature: "op1",
        cities: "op2",
        sweet: "op1",
        spice: "op2",
        surprise: "op1",
        luxury: "op1",
        room_service: "op1",
        view: "op1"
      },
      {
        name:"rajasthan",
        beach:'op2',
        hiking:'op2',
       history:'op1',
       nature:'op2',
       cities:'op1',
       sweet:'op1',
       spice:'op1',
       surprise:'op2',
       luxury:'op1',
       room_service:'op1',
       view:'op1',
       },
      {
        name:"srinagar",
        beach:'op2',
        hiking:'op1',
       history:'op1',
       nature:'op1',
       cities:'op2',
       sweet:'op1',
       spice:'op2',
       surprise:'op1',
       luxury:'op1',
       room_service:'op2',
       view:'op1',
       }
];
var n=3;
let login = new mongoose.model("log", userSchema);
let place = new mongoose.model("place", placeSchema);
for (var i = 0; i < n; i++) {
  place.create(cities[i], (err, response) => {
    if (err) throw new Error(err);
    else console.log("Data Added");
  });
}
app.use(express.static(__dirname + "/public"));
app.use(body.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.post("/signupPost", (req, res) => {
  signupInfo = {
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password
  };
  login.create(signupInfo, (err, response) => {
    if (err) console.log("User Not Created");
    else {
      // console.log('User Created');
      res.redirect("/success");
    }
  });
});

app.get('/',(req,res)=>{
  res.redirect('/index');
})

app.post("/loginCheck", (req, res) => {
  loginInfo = {
    email: req.body.email,
    password: req.body.password
  };

  login.find({ email: loginInfo.email, password: loginInfo.password }, (err, response) => {
    if (err) console.log("Error occured in login find.");
    else {
      if (Object.entries(response).length == 0) {
        res.redirect("/notFound");
      } else {
        flag = 1;
        res.redirect("/index");
        name = response[0].fname + " " + response[0].lname;
      }
    }
  });
});

app.get("/logout", (req, res) => {
  flag = 0;
  res.render("logoutPage", { flag: flag, name: name });
});

app.post('/responses',(req,res)=>{
    responses={
        beach:req.body.beach,
        hiking:req.body.hiking,
        history:req.body.history,
        nature:req.body.nature,
        cities:req.body.cities,
        sweet:req.body.sweet,
        spice:req.body.spice,
        surprise:req.body.surprise,
        luxury:req.body.luxury,
        room_service:req.body.room_service,
        view:req.body.view
        
    };
    place.find({name:'goa'},(err,resp)=>{
        console.log(resp);
    });
    let placeSuggest;
    place.find(responses,(err,response)=>{
        if(err)
        console.log('Error has occured in finding place.');
        else{
            placeSuggest=response.name;
            // console.log(response+"Objectblah");
            res.redirect('/suggestion');
        }
        // console.log("Response="+responses);
    });
});
app.get('/suggestion',(req,res)=>{
    res.render('suggestion',{flag: flag, name: name, placeSuggest:placeSuggest})
});
app.get('/:route',(req,res)=>{
  var strRoute=req.params.route;
  res.render(strRoute,{ flag: flag, name: name })
});

app.listen(process.env.port||8080 ,() => {
  console.log("Server Started");
});
