const RecipeList = require('../models/recipe-list');



function addRecipeToList(req, res, next){
    RecipeList.findById(req.params.recipeId)
        .then(recipeList => {
            recipeList.recipes.push(req.body);

            return recipeList.save()
        })
        .then(() => res.redirect(`/recipe-lists/${req.params.recipeListId}`))
        .catch(next)
}

function deleteRecipeFromList(req, res, next){
    RecipeList.findById(req.params.recipeListId)
        .then(recipeList => {
            if(!recipeList.user.equals(req.user._id)) throw new Error('Unauthorized')

            recipeList.recipes.id(req.params.recipeId).deleteOne()
            return recipeList.save()
            .then(() => res.redirect(`/recipe-lists/${req.params.recipeListId}`))
            .catch(next)
        })
}

module.exports = {
    addRecipeToList,
    deleteRecipeFromList,
}