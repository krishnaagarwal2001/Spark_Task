const { request } = require('express');
const User=require('../models/user');


//PROFILE PAGE
const profile=function(req,res){
    return res.render('users/user_profile',{
        layout:__dirname+'/../../src/views/users/user_layout',
        message:req.flash('message'),
    });
}

//SIGNUP PAGE
const signUp=function(req,res){

     if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    //console.log("here");
    return res.render('users/user_sign_up',{
        title:'Spark | Sign Up',
        message:req.flash('message'),
    })
}

const create=function(req,res){

    if(req.body.password != req.body.confirm_password)
    {   
        //console.log("check");
        req.flash('message','Error - Password and Confirm Password do not match');
        return res.redirect('back');
    }

    User.findOne({email: req.body.email},function(err,user){
        if(err){
            console.error(err);
            return;
        }

        if(!user){
            User.create(req.body,function(err,user){
               if(err){
                    console.error(err);
                    return;
               }
               req.flash('message','Account Created. Please Login');
                return res.redirect('/');
            })
        }
        else
        {   
            req.flash('message','Error - Email Id Already Exist');
            return res.redirect('back');
        }
    })
    //console.log(req.body);
    //console.log("hi");
    //return res.status(200).end();
}

//UPDATE PAGE
const updateInfo=function(req,res){

    return res.render('users/user_update_info',{
        title: 'Spark | Reset Password',
        layout:__dirname+'/../../src/views/users/user_layout',
        message:req.flash('message'),
    })

}

const update=function(req,res){

    //console.log("123456");
    if(req.body.password != req.body.confirm_password)
    {   
        req.flash('message','Error - Password and Confirm Password do not match');
        return res.redirect('back');
    }

    console.log(req.body);
           
            User.findOneAndRemove({email:req.body.email}).exec();
            User.create(req.body,function(err,user){
               if(err){
                    console.error(err);
                    return;
               }
               req.flash('message','Account Updated. Please Login Again');
                return res.redirect('/users/profile');
            });
    
}

//REST PAGE
const reset=function(req,res){

    return res.render('users/user_reset',{
        title: 'Spark | Reset Password',
        message:req.flash('message'),
    })
}

const sendOtp=function(req,res){
     req.flash('message','Error - Unable to send OTP to emails now');
    return res.redirect('/');
}


//LOGIN PAGE
const createSession=function(req,res){
    console.log("Successful");
     req.flash('message','Login Successful');
    return res.redirect('/');
}

//LOGOUT
const destroySession=function(req,res){
    req.logout();
    req.flash('message','Logout Successfully');
    return res.redirect('/');
} 
module.exports={
    profile,
    signUp,
    create,
    createSession,
    destroySession,
    reset,
    updateInfo,
    update,
    sendOtp
}