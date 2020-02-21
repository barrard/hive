const { Router } = require("express");
const Hive_Controller = require("../controllers/Hive_Controller.js");

const {
  ensure_authenticated
} = require("../middleware/router_middleware.js");

class Hive_Router {
  constructor() {
    this.hive_router = Router();
    this.buildRoutes();
  }

  buildRoutes() {

    /* add new worker */
    this.hive_router.post(
        "/worker",
        [ensure_authenticated],
        Hive_Controller.create_worker
      );

          /* get all workers */
    this.hive_router.get(
        "/allworkers",
        [ensure_authenticated],
        Hive_Controller.get_all_workers
      );

  }
}

// const User_Router = new User_Router();

module.exports = () => new Hive_Router();
