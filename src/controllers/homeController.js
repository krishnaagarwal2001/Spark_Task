const ejs=require('ejs');

module.exports.root=function(req,res){ 
    return res.render('home',{
        message:req.flash('message'),
    });
}