const { Router } = require("express");
const Worker_Controller = require("../controllers/Worker_Controller.js");

const { ensure_authenticated } = require("../middleware/router_middleware.js");

class Worker_Router {
  constructor() {
    this.worker_router = Router();
    this.buildRoutes();
  }

  buildRoutes() {
    /* GET */

    /* get_workers */
    this.worker_router.get(
      "/workers",
      [ensure_authenticated],
      Worker_Controller.get_workers
    );

    /* Add worker */
    this.worker_router.get(
      "/:worker_id",
      [ensure_authenticated],
      Worker_Controller.get_worker
    );

    /* PUT */
    /* Add worker */
    this.worker_router.put(
      "/:worker_id",
      [ensure_authenticated],
      Worker_Controller.update_worker
    );

    /* POST */

    /* Add worker */
    this.worker_router.post(
      "/add_worker",
      [ensure_authenticated],
      Worker_Controller.add_worker
    );
  }
}

// const Worker_Router = new Worker_Router();

module.exports = () => new Worker_Router();
