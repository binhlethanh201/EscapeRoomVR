const jwt = require('jsonwebtoken');
const Auth = require('../app/models/auth');
const User = require('../app/models/user');
const SECRET_KEY = 'your_secret_key';

async function authRequired(req,res,next){
    const token = req.cookies.token;
    if(!token){
        return res.redirect('/login');
    }
    try{
        const decoded = jwt.verify(token, SECRET_KEY);
        const found = await Auth.findOne({token});
        if(!found){
            throw new Error('Invalid token');
        }
        const user = await User.findOne({userId: decoded.userId});
        if(!user){
            throw new Error('User not found!')
        }
        req.user = user;
        next();
    } catch(err){
        res.clearCookie('token');
        res.redirect('/login');
    }
}
module.exports = {authRequired};
