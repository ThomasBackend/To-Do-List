const  User  = require('../models/user');
const customUtility = require('../utils/utility');

const registerUser = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    if(!email){
      return res.status(422).json({error :"Email is required"});
    };

    if(!password){
      return res.status(422).json({error : "Password is required"});
    };

    if(!username){
      return res.status(422).json({error : "Username is required"});
    };

    const hashedPassword = await customUtility.hashPassword(password);


    const newUser = await User.create({ 
      email : email,
      password : hashedPassword,
      username : username
    });

    res.status(201).json({message : "User created successfully", data : newUser._id});
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const login = async (req,res) => {
try {
  const {email, password} = req.body;

  if(!email){
    return res.status(422).json({error :"Email is required"});
  };

  if(!password){
    return res.status(422).json({error :"Password is required"});
  };

  const existsCheck = await User.find({ email : email});

  if(existsCheck.length === 0){
    return res.status(404).json({error : "Email not registered"});
  }

  const hashedPassword = await customUtility.hashPassword(password);

  const loginCheck = await User.find({email : email, password : hashedPassword});

  if(login.length === 0){
    return res.status(404).json({error : "Email or password invalid"});
  }

  return res.status(200).json({message : "Login successful",data : loginCheck[0]._id})

} catch (error) {
  console.log(error);
    res.status(500).json({ error: error.message });
}
}


module.exports = {
  registerUser,
  login
};