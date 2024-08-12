const  jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();


const generateJWT = async (userId) => {

    const payload = {
      userId: userId,
    };
  
    const options = {
      expiresIn: '30m', 
    };
  
    const token = jwt.sign(payload, process.env.SECRET_KEY , options);
  
    return token;
  }

  const  generateRandomId = async (length = 6)=> {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  }

  const hashPassword= async (password) => {
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    } catch (error) {
      throw new Error('Error hashing password');
    }
  }


  module.exports = {generateJWT, generateRandomId, hashPassword}