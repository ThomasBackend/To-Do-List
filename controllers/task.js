const  Task  = require('../models/task');
const  User  = require('../models/user');

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

    if(tasks.length === 0){
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
    const {userId, taskId} = req.params;

    const checkUserExistence = await User.findById(userId).exec();

    if(!checkUserExistence){
      return res.status(404).json({error : "No existing user matches this ID"});
    }

    const checkTaskExistence = await Task.findById(taskId).exec();

    if(!checkTaskExistence){
      return res.status(404).json({error : "Task does not exist"})
    }

    const singleTask = await Task.find({_id : taskId, userId : userId });

    if(singleTask.length === 0){
      return res.status(404).json({error : "Task does not belong to specified user"})
    }

    const deleteTask = await Task.findByIdAndDelete(id).exec();

    return res.status(200).json({message : "Task successfully deleted"})
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

const updateTaskTitle = async (req,res) => {
  try {
    const {id} = req.params;
    const {title} = req.body;

    if(!title){
      return res.status(422).json({error : "A new task title is required"});
    }

    const checkExistence = await Task.findById(id).exec();

    if(!checkExistence){
      return res.status(404).json({error : "No existing task matches this ID"});
    }

    const updateTask = await Task.findByIdAndUpdate(id, {title : title}).exec();

    return res.status(200).json({newTitle : title, oldTitle : updateTask.title})
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

const updateTaskDescription = async (req,res) => {
  try {
    const {id} = req.params;
    const {description} = req.body;

    if(!description){
      return res.status(422).json({error : "A new task description is required"});
    }

    const checkExistence = await Task.findById(id).exec();

    if(!checkExistence){
      return res.status(404).json({error : "No existing task matches this ID"});
    }

    const updateTask = await Task.findByIdAndUpdate(id, {description : description}).exec();

    return res.status(200).json({newDescription : description, oldDescription : updateTask.description})
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

const getAllTasksByUser = async (req,res) =>{
  try {
    
    const {id} = req.params;

    const tasks = await Task.find({userId : id}).sort({createdAt : -1}).exec();

    if(tasks.length === 0){
      return res.status(404).json({error : "There are no tasks"})
    }

    return res.status(200).json({result : tasks})
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

const getSingleTask = async (req,res) => {
  try {
    const {userId, taskId} = req.params;

    const checkUserExistence = await User.findById(userId).exec();

    if(!checkUserExistence){
      return res.status(404).json({error : "No existing user matches this ID"});
    }

    const checkTaskExistence = await Task.findById(taskId).exec();

    if(!checkTaskExistence){
      return res.status(404).json({error : "No existing task matches this ID"})
    }

    const singleTask = await Task.find({_id : taskId, userId : userId });

    if(singleTask.length === 0){
      return res.status(404).json({error : "Task does not belong to specified user"})
    }

    return res.status(200).json({message : "Task fetched successfully", data : singleTask})


  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

const updateTaskStatus = async (req,res) => {
  const {userId, taskId, status} = req.params;

  if(!userId){
    return res.status(422).json({error : "A new task description is required"});
  }

  if(!taskId){
    return res.status(422).json({error : "A new task description is required"});
  }

  if(!status){
    return res.status(422).json({error : "A new task description is required"});
  }
}

module.exports = {
  createTask,
  getAllTasks,
  deleteTask,
  updateTaskTitle,
  updateTaskDescription,
  getAllTasksByUser,
  getSingleTask
};