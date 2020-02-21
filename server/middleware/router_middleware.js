
module.exports = {
  
   ensure_not_logged_in(req, res, next){
     logger.log('IS THIS USER ALREADY LOCGED IN??')
     logger.log(!req.isAuthenticated ? true : false)
    if(!req.isAuthenticated) return res.redirect('/account-profile')
    next()
  },
  
  
   ensure_authenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    logger.log('non-authenticated user being redirected'.bgWhite)
    res.redirect('/login')
  
  },
  

}