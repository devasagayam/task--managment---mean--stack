const { User } = require ('../models/user.model');
const jwt = require('jsonwebtoken');




module.exports  = (req, res, next) => {
    let token = req.header('Authorization')
    if(token){
        token = token.split(' ')[1];
    }else{
        return res.status(401).send("No Authorization");
    }

    // verify the JWT
    jwt.verify(token, User.getJWTSecret(), (err, decoded) => {
        if (err) {
            // there was an error
            // jwt is invalid - * DO NOT AUTHENTICATE *
            res.status(401).send(err);
        } else {
            // jwt is valid
            req.user_id = decoded._id;
            next();
        }
    });
}
