const  Task  = require('../models/task');

const createArticle = async (req, res) => {
  try {
    const { title, body, author, tags } = req.body;

    if(!title){
      return res.status(422).json({error :"Title is required"})
    };

    if(!body){
      return res.status(422).json({error : "Body is required"})
    };

    if(!author){
      return res.status(422).json({error : "Author is required"})
    };

    if(!tags){
      return res.status(422).json({error : "Tags is required"})
    };

    if(!Array.isArray(tags)){
      return res.status(400).json({error : "Tags must be in an array"})
    }

    const newArticle = await Article.create({ 
      title : title,
      body : body,
      author : author,
      tags : tags
    });

    res.status(201).json(newArticle);
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getArticlesByPublishingDate = async (req,res) =>{
  try {
    
    const articles = await Article.find().sort({createdAt : -1});

    if(!articles){
      return res.status(404).json({error : "There are no articles"})
    }

    return res.status(200).json({result : articles})
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}



module.exports = {
  createArticle,
  getArticlesByPublishingDate
};