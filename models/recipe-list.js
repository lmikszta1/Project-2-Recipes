const mongoose = require('mongoose');
const recipeSchema = require('./recipe')

const recipeListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    recipes: [recipeSchema]
}, {
    timestamps: true
})

module.exports = mongoose.model('RecipeList', recipeListSchema)