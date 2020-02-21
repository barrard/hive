const { Router } = require("express");
const User_Controller = require("../controllers/User_Controller.js");

const {
  ensure_authenticated
} = require("../middleware/router_middleware.js");

class User_Router {
  constructor() {
    // this.test = Router();
    // this.hello = Router();
    this.user_router = Router();
    this.buildRoutes();
  }

  buildRoutes() {

    /* remove_account_address */
    // this.user_router.post(
    //   "/remove_account_address",
    //   [ensure_authenticated],
    //   User_Controller.remove_account_address
    // );

  }
}

// const User_Router = new User_Router();

module.exports = () => new User_Router();
