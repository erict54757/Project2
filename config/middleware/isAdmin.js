// This is middleware for restricting routes a user is not allowed to visit if not an administrator

module.exports = function(req, res, next) {
	// If the user is logged in, continue with the request to the restricted route
	console.log(req.user.isAdmin);
	if (req.user.isAdmin) {
		return next();
	}

	// If the user isn't' logged in, redirect them to the login page
	return res.redirect("/");
};
