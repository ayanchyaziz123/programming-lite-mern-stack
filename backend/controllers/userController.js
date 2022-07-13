const User = require('../models/user');
const Token = require('../models/token');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require('../utils/sendMail');
const mongoose = require('mongoose');
const { json } = require('body-parser');
const Comment = require('../models/user');
const Reply = require('../models/reply');



exports.DeleteUser = async (request, response, next) => {
    try {
        const user = await User.findByIdAndRemove(request.params.id);
        // await Comment.deleteOne({ user: request.params.id })
        // await Reply.deleteOne({ user: request.params.id })
        response.status(300).json({
            user: user,
            message: "Succesfully deleted"
        })
    }
    catch (error) {
        response.status(500).json(
            {
                message: "server error"
            }
        )

    }
}


exports.UpdateAdminUser = async (req, res, next) => {
    try {
        const { userId, firstName, lastName, email, verified, isAdmin } = req.body;
        let user;
        if (!req.filename) {
            user = {
                firstName: firstName,
                lastName: lastName,
                verified: verified,
                isAdmin: isAdmin
            }
        }
        else {
            user = {
                firstName: firstName,
                lastName: lastName,
                verified: verified,
                isAdmin: isAdmin,
                profile_pic: req.file.filename
            }

        }
        const id = mongoose.Types.ObjectId(userId);
        const filter = { _id: id }
        let updateUser = await User.findOneAndUpdate(filter, user, {
            new: true
        });

        return res.status(200).json({
            "user": updateUser,
            "message": "Update successfully"
        })

    }
    catch (error) {
        return res.status(400).json({
            "error": "error occured"
        })

    }
}


exports.UpdateUser = async (req, res, next) => {
    console.log("i am here", req.body);

    try {

        const { userId, firstName, lastName, email, password } = req.body;
        const existingUser = await User.findOne({ email: email });
        const isValidPassword = await bcrypt.compare(password, existingUser.password);
        if (!isValidPassword) return res.status(400).json({ error: "password does not match" });
        let user;
        if (!req.file) {
            user = {
                firstName: firstName,
                lastName: lastName,
            }
        }
        else {
            user = {
                firstName: firstName,
                lastName: lastName,
                profile_pic: req.file.filename
            }
        }
        const id = mongoose.Types.ObjectId(userId);
        const filter = { _id: id }
        let updateUser = await User.findOneAndUpdate(filter, user, {
            new: true
        });

        const token = jwt.sign({
            email: updateUser.email,
            userId: updateUser._id
        }, process.env.KEY, {
            expiresIn: '1h'
        })
        const user_info = {
            firstName: updateUser.firstName,
            lastName: updateUser.lastName,
            userId: updateUser._id,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
            profile_pic: updateUser.profile_pic,
            access_token: token
        }

        return res.status(200).json({
            "message": "update successfully",
            "user": updateUser,
            "user_info": user_info
        })

    }
    catch (err) {
        console.log("error is here => ", err);
        return res.status(400).json({ error: "error occured" });
    }
}


exports.GetUser = async (req, res, next) => {
    console.log("id   ", req.body.id);
    try {
        user = await User.findById(_id = req.body.id);
        console.log("users is here2 => ", user);
        return res.status(200).json({
            "user": user,
            "message": "Profile Loaded!"
        })

    }
    catch (err) {
        console.log("error is here => ", err);
        return res.status(400).json({ error: "error occured" });
    }
}

exports.GetAdminUser = async (req, res, next) => {
    console.log("id", req.params.id);
    try {
        user = await User.findById(_id = req.params.id);
        return res.status(200).json({
            "user": user,
            "message": "Success"
        })

    }
    catch (err) {
        console.log("error is here => ", err);
        return res.status(400).json({ error: "error occured" });
    }
}

exports.getUsers = async (req, res, next) => {
    try {
        users = await User.find();
        return res.status(200).json({
            "users": users,
            "message": "Success"
        })
    }
    catch (err) {
        return res.status(400).json({ error: "error occured" });
    }
}


// for creating user
exports.SignUp = async (req, res, next) => {


    try {
        const { firstName, lastName, email, password, password2 } = req.body;
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

        if (!email || !password || !firstName || !lastName || !req.file) {
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
            profile_pic: req.file.filename
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

        console.log('success-1');

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).json({ error: "Invalid Link" });

        console.log('success-2');
        const id = { _id: user._id };
        const update = { verified: true };
        let ver = await User.findOneAndUpdate(id, update, {
            new: true
        });
        const us = await User.findOne({ _id: req.params.id });
        await Token.findByIdAndRemove(token._id);
        console.log('success-3');
        const tkn = jwt.sign({
            email: user.email,
            userId: user._id
        }, process.env.KEY, {
            expiresIn: '1h'
        })
        console.log('success-4');
        const user_info = {
            firstName: user.firstName,
            lastName: user.lastName,
            userId: user._id,
            email: user.email,
            isAdmin: user.isAdmin,
            profile_pic: user.profile_pic,
            access_token: tkn
        }
        console.log('success');
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
        console.log("im work 2", req.params.id);
        //ERROR HERE TO DO
        User.updateOne({ _id: req.params.id }, updateUser).then(
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
            isAdmin: user.isAdmin,
            profile_pic: user.profile_pic,
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
        isAdmin: existingUser.isAdmin,
        profile_pic: existingUser.profile_pic,
        access_token: token
    }
    return res.status(200).json({
        "access_token": token,
        "user_info": user_info,
        "message": "logIn successfully"
    })
}