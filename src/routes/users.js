const express=require('express');
const passport=require('passport');
const userController=require('../controllers/userController');
const User=require('../models/user');
const router=express.Router();

router.get('/profile',passport.checkAuthentication,userController.profile);
router.get('/signup',userController.signUp);
router.get('/reset',userController.reset);
router.get('/user_update_info',passport.checkAuthentication,userController.updateInfo);

router.post('/create',userController.create);
router.post('/update',userController.update);
router.post('/sendOtp',userController.sendOtp);

// router.post('/create-session',passport.authenticate(
//     'local',
//     {   
//         failureFlash: {type:'message', message: 'Error - Invalid Credentials'},
//         successFlash: {type:'message', message: 'Login Successful'},
//         successRedirect:'/users/profile',
//         failureRedirect:'/',
//     }
// ),userController.createSession);

router.post('/create-session', async function(req, res, next) 
{
  passport.authenticate('local',async function(err, user, info) 
  {

    if (err) { return next(err); }

    if (!user) { 
        
        const doc=await User.findOne({email:req.body.email}).exec();

        if(!doc)
        {
            req.flash('message','Error - User not registered');
            return res.redirect('/'); 
        }

        req.flash('message','Error - Invalid Credentials');
        return res.redirect('/'); 
       
    }

    req.logIn(user, function(err) {
      if (err) { return next(err); }
        
      req.flash('message','Login Successful');
      return res.redirect('/users/profile');
    });

  })(req, res, next);
});

router.get('/signout',userController.destroySession);
module.exports=router;