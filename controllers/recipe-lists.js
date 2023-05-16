const RecipeList = require('../models/recipe-list');

function index(req, res, next) {
    RecipeList.find({user: req.user._id})
        .then(recipeLists => {
            res.render('recipe-lists/index', {
                recipeLists,
                title: 'My Recipe Lists'
            })
        })
        .catch(next);
}

function newRecipeList(req, res) {
    res.render('recipe-lists/new', {title: 'New Recipe List'});
}

function create(req, res, next){
    req.body.user = req.user._id;
    RecipeList.create(req.body)
        .then(() => res.redirect('recipe-lists'))
        .catch(next)
}

function show(req, res, next){
    RecipeList.findById(req.params.id)
        .then(recipeList => {
            res.render('recipe-lists/show', {
                recipeList,
                title: 'Recipe List Details'
            })
        })
        .catch(next)
}

module.exports = {
    index,
    newRecipeList,
    create,
    show,
}