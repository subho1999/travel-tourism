let express=require('express');
let app=express();
let ejs=require('ejs');
let body=require('body-parser');
let request=require('request');
let mongoose=require('mongoose');
let dburl='mongodb://localhost/travelDB';
mongoose.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true});
let db=mongoose.connection;
db.on('error',console.error.bind(console,'Connnection Error -'));
db.once('open',()=>{
    console.log('Database Connected');
});



app.use(express.static(__dirname + '/public'));
app.use(body.urlencoded({extended:true}));
app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.render('index');
});
app.get('/packages',(req,res)=>{
    res.render('package');
});
app.get('/signup',(req,res)=>{
    res.render('signup');
});
app.get('/login',(req,res)=>{
    res.render('login');
});
app.get('/experience',(req,res)=>{
    res.render('experience');
});

app.listen(3000,process.env.ID,()=>{
    console.log('Server Started');
});