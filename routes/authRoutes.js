const passport = require("passport");

module.exports = app => {
	
	app.get(
		"/auth/google",
		passport.authenticate("google", { scope: ["profile", "email"] })
	);

	app.get(

		'/api/logout', (req, res) => {
			req.logout();
			res.send(req.user)
		}

		)

	// after user grants permission, redirected to this location, passport sends request to google, grabs info
	app.get("/auth/google/callback", passport.authenticate("google"));
};
