const express = require('express')
const router = express.Router()
const passport = require('passport')

/* GET home page. */
router.get('/', function (req, res, next) {
	fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
		.then(res => res.json())
		.then(categories => {
			res.render('recipes/index', {
				categories: categories.meals,
				title: 'Recipe Categories'
			})
		})
})

router.get(
	'/auth/google',
	passport.authenticate('google', { scope: ['profile', 'email'] })
)

router.get(
	'/oauth2callback',
	passport.authenticate('google', {
		successRedirect: '/',
		failureRedirect: '/',
	})
)

router.get('/logout', function (req, res) {
	req.logout(function () {
		res.redirect('/')
	})
})

module.exports = router
