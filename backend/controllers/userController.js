const User = require('../models/user');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// for creating user
exports.SignUp = async (req, res, next) => {
    const user = req.body.user;
    const { firstName, lastName, email, password, password2 } = user;
    if(password != password2){
        return res.status(400).json({error: "Password did not match"});
    }
    if(password.length <= 7)
    {
        return res.status(400).json({error: "Password length need to be more than 6"});
    }
    let pattern = new RegExp("^(?=(.*[a-zA-Z]){1,})(?=(.*[0-9]){2,}).{8,}$");
    if(!pattern.test(password))
    {
        return res.status(400).json({error: "Weak password."})

    }

    if (!email || !password || !firstName || !lastName) {
        console.log("error1");
        return res.status(400).json({ error: "Not all fields have been entered." });
    }
    const existingUser = await User.findOne({ email: email });
    if (existingUser)
    {
        res.status(400).send({ error: 'This email address is already being used' })
    }
        

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
        firstName,
        lastName,
        email,
        password: passwordHash,
    });
    const savedUser = await newUser.save();
    let token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
  
    const message = `${process.env.BASE_URL}/user/verify/${user.id}/${token.token}`;
      await sendEmail(user.email, "Verify Email", message);
  
      res.send("An Email sent to your account please verify");
    res.json({ msg: "Go to email and verify your account!!!!" });
}

exports.SignUp_verification = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) return res.status(400).send("Invalid link");
    
        const token = await Token.findOne({
          userId: user._id,
          token: req.params.token,
        });
        if (!token) return res.status(400).send("Invalid link");
    
        await User.updateOne({ _id: user._id, verified: true });
        await Token.findByIdAndRemove(token._id);
    
        res.send("email verified sucessfully");
      } catch (error) {
        res.status(400).send("An error occured");
      }

}

exports.SignIn = async (req, res, next) => {
    const user = req.body.user;
    const {email, password} = user;
    const existingUser = await User.findOne({ email: email });
    if(!existingUser) return res.status(400).json({error: "email does not exist"});
    const isValidPassword = await bcrypt.compare(password, existingUser.password);
    if(!isValidPassword) return res.status(400).json({error: "password does not match"});


    const token = jwt.sign({
        email: existingUser.email,
        userId: existingUser._id
    }, 'abcabcadefgh',{
        expiresIn: '1h'
    })
    const user_info = {
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        userId: existingUser._id,
        email: existingUser.email,
        access_token: token
    }
    res.status(200).json({
        "access_token": token,
        "user_info": user_info,
        "message": "logIn successfully"
    })
}