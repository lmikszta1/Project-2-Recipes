const RecipeList = require('../models/recipe-list');

function index(req, res, next){
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${req.params.category}`)
        .then(res => res.json())
        .then(category => {
            let tempCategory = category
            res.render('recipes/index', {
                recipes: tempCategory.meals,
                title: `${req.params.category}`
            })
        })
        .catch(next)
}

function show(req, res, next) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${req.params.recipe}`)
        .then(res => res.json())
        .then(recipe => {
            res.render('recipes/show', {
                recipe: recipe.meals[0],
                title: 'Recipe Details'
            })
        })
        .catch(next)
}

function addRecipeToList(req, res, next){
    RecipeList.findById(req.params.recipeListId)
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
    index,
    show,
    addRecipeToList,
    deleteRecipeFromList,
}