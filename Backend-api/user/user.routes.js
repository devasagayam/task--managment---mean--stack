const express = require('express');
const router = express.Router();
const { User } = require ('../models/user.model');
const { List } = require('../models/lists.model');
const { Task } = require('../models/tasks.model');

module.exports = router;

router.post('', (req, res) => {
    // User sign up

    let body = req.body;
    let newUser = new User(body);

    newUser.save().then(() => {
        return newUser.createSession();
    }).then((refreshToken) => {

        return newUser.generateAccessAuthToken().then((accessToken) => {return { accessToken, refreshToken }
        });
    }).then((authTokens) => {  
        res.json({'user':newUser,'token':authTokens.accessToken});
    }).catch((e) => {
        res.status(400).send(e);
    })
})

router.post('/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    User.findByCredentials(email, password).then((user) => {
        return user.createSession().then((refreshToken) => {

            return user.generateAccessAuthToken().then((accessToken) => {
                 return { accessToken, refreshToken }
            });
        }).then((authTokens) => {
             res.json({'user':user,'token':authTokens.accessToken});
        })
    }).catch((e) => {
        res.status(400).send(e);
    });
})