const express = require('express');
const {} = require('../controllers/task')

const router = express.Router();

router.get('/fetch/date', getArticlesByPublishingDate);
router.post('/create', createArticle);


module.exports = router;

