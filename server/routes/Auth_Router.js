const { Router } = require("express");
const Auth_Controller = require("../controllers/Auth_Controller.js");
const User_Controller = require("../controllers/User_Controller.js");

const passport = require("passport");
const strats = require("../services/passport");

const {
  ensure_not_logged_in,
  ensure_authenticated, ensure_admin
} = require("./../middleware/router_middleware.js");

//PASSPORT FUNCTIONS
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User_Controller.get_user_by_id(id, function(err, user) {
    done(err, user);
  });
});

passport.use("local", strats.local_login);

// function auth_user(req, res, next) {
//   passport.authenticate("local", {
//     failureRedirect: "/login"
//   });
// }

class Auth_Router {
  constructor() {
    // this.test = Router();
    // this.hello = Router();
    this.auth_router = Router();
    this.buildRoutes();
  }

  buildRoutes() {
/* Should split these up to help organize */
/* All Route/handlers mapped to controllers */


    // /* verify_email */
    // this.auth_router.get("/verify_email", [ensure_authenticated],
    // User_Controller.verify_email);

    // /* resend_email_verification */
    // this.auth_router.post("/resend_email_verification", [ensure_authenticated],
    // User_Controller.resend_email_verification);




    // /* update_user_profile */
    // this.auth_router.post("/update_user_profile", [ensure_authenticated],
    //   User_Controller.update_user_profile);

    /* Handle usre profile img uploads */
    this.auth_router.post("/upload_profile_imgs", [ensure_authenticated],
    User_Controller.upload_profile_imgs);



    /* Sign Up POST route */
    this.auth_router.post("/signup", Auth_Controller.sign_up);

    /* Login POST route */
    this.auth_router.post("/login", [ensure_not_logged_in], Auth_Controller.login);

    /* LOGOUT */
    this.auth_router.get("/logout", [ensure_authenticated], Auth_Controller.logout);

    // this.test.get('/', (req, res) => {res.send('test')})
    // this.hello.get('/', (req, res) => {res.send('hello')})
  }
}


module.exports = () => new Auth_Router();
