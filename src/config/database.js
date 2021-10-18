const mongoose=require('mongoose');

const connect = ()=>{
    console.log("Mongodb Connected");
    return mongoose.connect('mongodb://localhost/spark');
}

module.exports=connect;