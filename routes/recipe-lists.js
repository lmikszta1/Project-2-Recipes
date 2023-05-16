const express = require('express');
const router = express.Router();

const recipeListCtrl = require('../controllers/recipe-lists');

router.get('/', recipeListCtrl.index)
router.get('/new', recipeListCtrl.newRecipeList)
router.post('/', recipeListCtrl.create)

router.get('/:id', recipeListCtrl.show)

module.exports = router;