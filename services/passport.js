const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");

const User = mongoose.model("users");


passport.serializeUser( (user, done) => {

	done(null, user.id)


} )

passport.deserializeUser( (id, done) => {

	User.findById(id).then( user => {
		done(null, user)
	})


} )

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: "/auth/google/callback",
			userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
		},
		(accessToken, refreshToken, profile, done) => {
			try {
				User.findOne({ googleId: profile.id}).then(existingUser => {
					if (existingUser) {
					// have requirecord with idea
				    	done(null, existingUser)
				    } else {
				    // create new user
				    new User({googleId: profile.id}).save().then(user => done(null, user) )
				    	
				    }



			})
			} catch (e) {
				console.log(e);
			}
		}
	)
);
