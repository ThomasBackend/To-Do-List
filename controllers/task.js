const  Task  = require('../models/task');

const createTask = async (req, res) => {
  try {
    const { title, description, id } = req.body;

    if(!title){
      return res.status(422).json({error :"Title is required"})
    };

    if(!description){
      return res.status(422).json({error : "Description is required"})
    };

    if(!id){
      return res.status(422).json({error : "User's ID is required"})
    };

    const newTask = await Task.create({ 
      title : title,
      description : description,
      userId : id
    });

    res.status(201).json({message : "Task Created Successfully", data : newTask});
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getAllTasks = async (req,res) =>{
  try {
    
    const tasks = await Task.find().sort({createdAt : -1});

    if(!tasks){
      return res.status(404).json({error : "There are no tasks"})
    }

    return res.status(200).json({result : tasks})
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

const deleteTask = async (req,res) => {
  try {
    const {id} = req.params;

    const checkExistence = await Task.findById(id).exec();

    if(!checkExistence){
      return res.status(404).json({error : "No existing task matches this ID"});
    }

    const deleteTask = await Task.findByIdAndDelete(id).exec();

    return res.status(200).json({message : "Task successfully deleted"})
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}


module.exports = {
  createTask,
  getAllTasks,
  deleteTask
};