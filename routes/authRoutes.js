const passport = require("passport");

module.exports = app => {
	
	app.get(
		"/auth/google",
		passport.authenticate("google", { scope: ["profile", "email"] })
	);

	// after user grants permission, redirected to this location, passport sends request to google, grabs info
	app.get("/auth/google/callback", passport.authenticate("google"));
};
