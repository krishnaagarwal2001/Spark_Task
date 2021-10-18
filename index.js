const express=require('express');

const {json,urlencoded}=require('body-parser');
const cors=require('cors');

const session=require('express-session');
const passport=require('passport');
const passportlocal=require('./src/config/passport-local-strategy');
const mongoStore=require('connect-mongo');

const flash = require('connect-flash');


const router=require('./src/routes/index');
const connect=require('./src/config/database')
var expressLayouts=require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const app=express();

app.use(cors());
app.use(json());
app.use(urlencoded({extended:true}));
app.use(express.static(__dirname+'/src/assets'));
app.use(expressLayouts);

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.set('layout',__dirname+'/src/views/layout')
app.set('view engine','ejs');
app.set('views','./src/views');

// app.use((req, res, next)=>{
//   res.locals.message = req.session.message;
//   delete req.session.message;
//   next();
// });

app.use(cookieParser()); 
app.use(session({
    name:'Spark',
    secret:'Kris',
    resave:false,
    cookie:{
        maxAge: 600000
    },
    saveUninitialized: false,
    store:new mongoStore({
        
            mongoUrl:'mongodb://localhost/twitter_dev',
            autoRemove: 'disable'
        
    },function(err){
        if(err)
        console.error(err);

        console.log('connect-mongo setup done');
    })
}));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/',router);
app.listen(3000,async()=>{
    await connect();
    console.log("Server started at 3000");
})