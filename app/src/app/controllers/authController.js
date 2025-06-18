const Auth = require("../models/auth");
const User = require('../models/user');
const Session = require('../models/session');
const jwt = require('jsonwebtoken');
const {v4: uuidv4} = require('uuid');

const SECRET_KEY = 'your_secret_key';

class AuthController{
  //[GET] /login
  loginForm(req,res,next){
    res.render('auth/login');
  }

  //[POST] /login
 async login(req, res, next) {
    console.log('POST /login called with body:', req.body);
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    console.log('User found:', user);
    if (!user) {
      return res.render('auth/login', { error: 'Wrong username or password!' });
    }
    
    // Tạo token và session
    const token = jwt.sign(
      { userId: user.userId, role: user.role },
      SECRET_KEY,
      { expiresIn: '3h' }
    );
    const tokenId = 'token_' + uuidv4();
    const sessionId = 'session_' + uuidv4();
    
    await Auth.create({
      tokenId,
      userId: user.userId,
      token,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 3 * 3600 * 1000),
    });
    
    await Session.create({
      sessionId,
      userId: user.userId,
      gameData: {},
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    });
     user.currentSessionId = sessionId;
    user.lastLogin = new Date();
    await user.save();
    
    // Lưu token vào cookie và chuyển hướng đến trang home
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/home'); // Chuyển hướng đến trang home
  } catch (err) {
    console.log('login error: ', err);
    res.status(500).render('auth/login', { error: 'Error! Please try again.' });

  }
}


  //[POST] /logout
  async logout(req,res,next){
    try{
      //lay token tu cookie
      const token = req.cookies.token;
      //xoa token khoi auth
      if(token){
        await Auth.deleteOne({token});
      }
      res.clearCookie('token');
      //chuyen huong vao login
      res.redirect('/login');
    } catch(err){
      console.log('Logout error: ', err);
      res.status(500).send('Try Again!');
    }
  }
}

module.exports = new AuthController();
