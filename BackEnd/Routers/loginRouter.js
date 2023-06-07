const express = require("express");
const Router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserLoginModel = require('../Models/userLoginModel')

// http://localhost:4500/login
Router.post('/', async (req, res) => {

    try {
        let { email, password } = req.body;
        // 1**. Validate the request with the JOI model
        const valRes = UserLoginModel.validatePost({ email, password }); // synchronized method for running validations
        if (valRes.error) {
            console.log(valRes.error);
            return res.status(400).send(valRes.error);
        }

        // 2**. Create a Mongoose Model based on the JOI Model

        const user = await UserLoginModel.findOne({ email: email });
        if (user === null)
            return res.status(401).send('Incorrect please try again');

        // 3**. Check the password that sent from user, if it's correct send a token. 
        //      else send http status 401
        if (await bcrypt.compare(password, user.password.toString())) {
            res.json({ token: jwt.sign({ id: user.id, email: email }, process.env.SECRET, { expiresIn: '1h' }) });
        }
        else
            res.status(401).send('Unauthorized');
    } catch (err) {
        res.status(500).send(err.message);
    }
})



module.exports = Router;