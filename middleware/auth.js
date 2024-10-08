const jwt = require('jsonwebtoken');
require('dotenv').config();


const auth = (req, res, next) => {
    try{
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];

  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header is missing' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token is missing' });
  }
  
  
    // Verify the token
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403).json({error :"Forbidden. Token is not valid"}); 
      }
      req.user = user;
      next();
    });

  
  }catch(err){
        return  res.status(401).json({error:"Unauthorized"});
    }
  }

  module.exports = auth;