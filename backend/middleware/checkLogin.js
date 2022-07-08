const jwt = require('jsonwebtoken');


const checkLogIn = (req, res, next) =>{
    const {authorization} = req.headers;
    try{
        const token = authorization.split(' ')[1];
        const decode = jwt.verify(token, process.env.KEY);
        const {email, userId} = decode;
        req.email = email;
        req.userId = userId;
        next();

    }
    catch(error)
    {
        next("authentication failed");

    }
};

module.exports = checkLogIn;


