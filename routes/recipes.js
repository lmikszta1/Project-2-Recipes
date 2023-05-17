const express = require('express');
const router = express.Router();

const recipeCtrl = require('../controllers/recipes');

router.get('/:category', recipeCtrl.index);
router.get('/show/:recipe', recipeCtrl.show);
router.post('/:recipeListId', recipeCtrl.addRecipeToList);
router.delete('/:recipeListId/:recipeId', recipeCtrl.deleteRecipeFromList);

module.exports = router;