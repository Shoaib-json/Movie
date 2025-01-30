module.exports.check = (req, res, next) => {
    console.log(req.user); 

    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("Error", "You need to log in first"); 
        return res.redirect("/user/log"); 
    }

    next(); 
};
module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl; 
    }
    next(); 
};
module.exports.logOut = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("Error", "You are loggedOut");
        res.redirect("/movie");
    });
}