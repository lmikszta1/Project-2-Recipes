const RecipeList = require('../models/recipe-list');


// READ 
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

// CREATE
function create(req, res, next){
    req.body.user = req.user._id;
    RecipeList.create(req.body)
        .then(() => res.redirect('recipe-lists'))
        .catch(next)
}

// READ - show
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

function updateRecipeListForm(req, res, next){
    RecipeList.findById(req.params.id)
        .then(recipeList => {
            res.render('recipe-lists/edit', {
                recipeList,
                title: 'Edit Recipe List Details'
            })
        })
}

// UPDATE
function update(req, res, next){
    RecipeList.findById(req.params.id)
        .then(recipeList => {
            if(!recipeList.user.equals(req.user._id)) throw new Error('Unauthorized')
            return recipeList.updateOne(req.body)
        })
        .then(() => res.redirect(`/recipe-lists/${req.params.id}`))
        .catch(next)
}

function deleteRecipeList(req, res, next){
    RecipeList.findById(req.params.id)
        .then(recipeList => {
            if(!recipeList.user.equals(req.user._id)) throw new Error('Unauthorized')
            return recipeList.deleteOne()
        })
        .then(() => res.redirect('/recipe-lists'))
        .catch(next)
}

module.exports = {
    index,
    newRecipeList,
    create,
    show,
    updateRecipeListForm,
    update,
    deleteRecipeList
}