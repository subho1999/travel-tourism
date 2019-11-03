let express=require('express');
let app=express();
let ejs=require('ejs');
let body=require('body-parser');
let request=require('request');
let mongoose=require('mongoose');
let dburl='mongodb+srv://sarthaksharma:abc1234@cluster0-ze17k.mongodb.net/test?retryWrites=true&w=majority/travelDB';
mongoose.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true});
let db=mongoose.connection;
db.on('error',console.error.bind(console,'Connnection Error -'));
db.once('open',()=>{
    console.log('Database Connected');
});

app.use(body.urlencoded({extended:true}));
app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.render('mainPage');
});


app.listen(3000,process.env.ID,()=>{
    console.log('Server Started');
});