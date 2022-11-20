const express = require('express');
const router = express.Router();

//Connection creation and new db created
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

mongoose.connect('mongodb://localhost:27017/userCRUD',{useNewUrlParser:true,
useUnifiedTopology: true});

//schema
const userSchema = new mongoose.Schema({
    Name : String,
    LastName : String,
    image : String,
    _id: {

        type: String,
        default: function () {
            return new ObjectId().toString()
        }
    }
})

const User = mongoose.model('user', userSchema);


router.get('/',async function(req,res){
    try{
       // console.log("first")
        const users = await User.find();
       // console.log(users)
        res.json({"user": users})
    }catch( error ){
        console.log(error);
    }
});

router.post('/add', async function(req,res){
    // console.log("second")
    const user = req.body;

    const newUser = new User(user);

    try{
        const userRes = await User.create(user);
    // console.log("second222")
    res.json({"msg": userRes})

        
    }catch( error ){
        console.log(error);
    }
});

router.get('/:id', async function(req,res){
    try{
        const user = await User.findById(req.params.id);
    res.json({"User": user})

        
    }catch( error ){
        console.log(error);
    }
});

router.put('/:id', async function(req,res){
    const user = req.body;

    const editUser = new User(user);
    try{
        await User.updateOne({_id:req.params.id},editUser);
    res.json({"msg": "Updated Successfully"})

        
    }catch( error ){
        console.log(error);
    }
});

router.delete('/:id', async function(req,res){
    try{
        await User.deleteOne({_id: req.params.id});
    res.json({"msg": "Deleted Successfully"})

        
    }catch( error ){
        console.log(error);
    }
});

module.exports = router;