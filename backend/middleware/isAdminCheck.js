const jwt = require('jsonwebtoken');
const User = require('../models/user');


const isAdminCheck =  (req, res, next) =>{
    const {authorization} = req.headers;
    try{
        const token = authorization.split(' ')[1];
        const decode = jwt.verify(token, process.env.KEY);
        const {email, userId} = decode;
        req.email = email;
        req.userId = userId;
        const checkUser =  User.findOne({ email: email });
        const flag = checkUser.isAdmin;
        if(!flag)
        {
           res.status(500).json({
                message: "Auth failed"
              });
        }
        else{
            next();
        }
        

    }
    catch(error)
    {
        next("authentication failed");

    }
};

module.exports = isAdminCheck;


