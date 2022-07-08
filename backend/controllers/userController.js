const User = require('../models/user');
const Token = require('../models/token');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require('../utils/sendMail');


// for creating user
exports.SignUp = async (req, res, next) => {

    try {
        const user = req.body.user;
        const { firstName, lastName, email, password, password2 } = user;
        if (password != password2) {
            return res.status(400).json({ error: "Password did not match" });
        }
        if (password.length <= 7) {
            return res.status(400).json({ error: "Password length need to be more than 6" });
        }
        let pattern = new RegExp("^(?=(.*[a-zA-Z]){1,})(?=(.*[0-9]){2,}).{8,}$");
        if (!pattern.test(password)) {
            return res.status(400).json({ error: "Weak password." })

        }

        if (!email || !password || !firstName || !lastName) {
            return res.status(400).json({ error: "Not all fields have been entered." });
        }
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
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
        const createToken = jwt.sign({
            email: savedUser.email,
            userId: savedUser._id
        }, process.env.KEY, {
            expiresIn: '1h'
        })

        let token = await new Token({
            userId: savedUser._id,
            token: createToken,
        }).save();

        const message = `http://localhost:3000/api/user/verify/${savedUser.id}/${token.token}`;
        const check = await sendEmail(savedUser.email, "Verify Email", message);
        if (!check) {
            await Token.findByIdAndRemove(savedUser._id);
            await User.findByIdAndRemove(token._id);
            return res.status(400).json({ error: "Your Given Email Does not work!!!" });
        }
        else {
            return res.status(200).json({ "msg": "Go to email and verify your account!!!!" });
        }
    }
    catch (error) {
        console.log(error)
        res.status(400).send("An error occured");
    }
}


exports.SignUp_verification = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) return res.status(400).json({ error: "Invalid Link" });

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).json({ error: "Invalid Link" });


        const id = { _id: user._id };
        const update = { verified: true };
        let ver = await User.findOneAndUpdate(id, update, {
            new: true
        });
        const us = await User.findOne({ _id: req.params.id });
        await Token.findByIdAndRemove(token._id);

        const tkn = jwt.sign({
            email: user.email,
            userId: user._id
        }, process.env.KEY, {
            expiresIn: '1h'
        })
        const user_info = {
            firstName: user.firstName,
            lastName: user.lastName,
            userId: user._id,
            email: user.email,
            access_token: tkn
        }
        return res.status(200).json({
            "access_token": tkn,
            "user_info": user_info,
            "message": "Email verified Successfully"
        })
    } catch (error) {
        res.status(400).send("An error occured");
    }

}

exports.ResetPassword = async (req, res, next) => {
    try {
        const email = req.body.email;
        console.log(email);
        const existingUser = await User.findOne({ email: email });
        if (!existingUser) return res.status(400).send("No email registerd with this email");
        const salt = await bcrypt.genSalt();
        const createToken = jwt.sign({
            email: existingUser.email,
            userId: existingUser._id
        }, process.env.KEY, {
            expiresIn: '1h'
        })
        const odd = await Token.findOne({ userId: existingUser.id });
        if (odd) {
            return res.status(400).send("Already Email sent in your account please verify");
        }
        let token = await new Token({
            userId: existingUser._id,
            token: createToken,
        }).save();
        const message = `http://localhost:3000/api/user/password/verify/${existingUser.id}/${token.token}`;
        const check = await sendEmail(existingUser.email, "Verify Email", message);
        if (check)
            return res.status(200).json({ "msg": "Go to email and verify your account!!!!" });
        else return res.status(400).send("Error");
    }
    catch (error) {
        return res.status(200).json({ "msg": "Error Occ!!!!" });
    }
}

exports.ResetPasswordVerification = async (req, res, next) => {
    console.log('req ', req.params.id, req.params.token)
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) return res.status(400).json({ error: "Invalid Link" });

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).json({ error: "Invalid Link" });
        return res.status(200).json({
            "message": "Email verified Successfully",
        })

    }
    catch (error) {
        return res.status(400).json({ "msg": "Error Occ!!!!" });
    }
}

exports.UpdatePassword = async (req, res, next) => {
    console.log('req', req.params.id, req.params.token);
    console.log(req.body)
    try {

        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;
        const user = await User.findOne({ _id: req.params.id });
        if (!user) return res.status(400).json({ error: "Invalid Link" });

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).json({ error: "Invalid Link" });
        console.log("im work 1");
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const updateUser = new User({
            _id: req.params.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: passwordHash,
        });
        console.log("im work 2");
        //ERROR HERE TO DO
        User.updateOne({ _id: request.params.id }, updateUser).then(
            () => {
                // res.status(201).json({
                //     message: 'Thing updated successfully!'
                // });
                console.log("success");
            }
        ).catch(
            (error) => {
                // res.status(400).json({
                //     error: error
                // });
                console.log(error);
            }
        );
        console.log("im work 2x");
        await Token.findByIdAndRemove(token._id);
        const tkn = jwt.sign({
            email: user.email,
            userId: user._id
        }, process.env.KEY, {
            expiresIn: '1h'
        })
        console.log("im work 3");
        const user_info = {
            firstName: user.firstName,
            lastName: user.lastName,
            userId: user._id,
            email: user.email,
            access_token: tkn
        }
        res.status(200).json({
            "access_token": token,
            "user_info": user_info,
            "message": "logIn successfully"
        })
    }
    catch (error) {
        return res.status(400).json({ error: error });
    }

}

exports.SignIn = async (req, res, next) => {
    const user = req.body.user;
    const { email, password } = user;
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) return res.status(400).json({ error: "email does not exist" });
    const isValidPassword = await bcrypt.compare(password, existingUser.password);
    if (!isValidPassword) return res.status(400).json({ error: "password does not match" });


    const token = jwt.sign({
        email: existingUser.email,
        userId: existingUser._id
    }, process.env.KEY, {
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