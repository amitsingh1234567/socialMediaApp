const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const singToken = id => {
    return jwt.sign({id}, 'mySecret', {expiresIn: '6h'});
}
exports.signup = async (req, res, next) => {
    const {name, email, password } = req.body;
    try{
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({success: false, message: 'User all ready exist with this email'});
        }
        
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hashPassword) => {
                if(err) {
                    console.log(err);
                    return;
                }
                const newUser = new User({
                    name: name,
                    email: email,
                    password: hashPassword
                });
                try{
                    const user = await newUser.save();
                    res.status(201).json({success: true, user: user, message: 'User registration successfully'})
                 }
                 catch(err){
                    res.status(400).json({success: false, message: err});
                    console.log(err);
                 }
            });
        });
    }
    catch(err){
      console.log(err);
    }

    // console.log(req.body)
    // res.json({success: true, message: 'Signup route working correctly'});
};

exports.signIn = async (req, res, next) => {
    const {email, password} = req.body;

    // 1) Check if email and password exist
    if(!email || !password){
        return res.status(400).json({success: false, message: 'Please provide email and password!'});
    };

    try{
       const user = await User.findOne({email});
       if(!user){
        return  res.status(400).json({success: false, message: 'User does not exist with this email'});
       };

       bcrypt.compare(password, user.password, (err, isCorect) => {
        if(!isCorect){
            return  res.status(400).json({success: false, message: 'Incorrect password'});
        }

        // Create user token
        let Token = singToken(user._id);
        return  res.status(200).json({success: true, token: Token, message: 'Login sucessfully'});
    });
    }catch(err){
        console.log(err)
    }
};