const express = require('express');
const router = express.Router();

const recipeCtrl = require('../controllers/recipes');

router.post('/:recipeListId', recipeCtrl.addRecipeToList);
router.delete('/:recipeListId/:recipeId', recipeCtrl.deleteRecipeFromList);

module.exports = router;