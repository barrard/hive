const { Router } = require("express");
const Proposal_Controller = require("../controllers/Proposal_Controller.js");

const { ensure_authenticated } = require("../middleware/router_middleware.js");

class Proposal_Router {
  constructor() {
    this.proposal_router = Router();
    this.buildRoutes();
  }

  buildRoutes() {
    /* GET */

    /* get_proposals */
    this.proposal_router.get(
      "/proposals",
      [ensure_authenticated],
      Proposal_Controller.get_proposals
    );

    /* Add proposal */
    this.proposal_router.get(
      "/:proposal_id",
      [ensure_authenticated],
      Proposal_Controller.get_proposal
    );

    /* PUT */
    /* Add proposal */
    this.proposal_router.put(
      "/:proposal_id",
      [ensure_authenticated],
      Proposal_Controller.update_proposal
    );

    /* POST */

    /* Add proposal */
    this.proposal_router.post(
      "/",
      [ensure_authenticated],
      Proposal_Controller.add_proposal
    );
  }
}


module.exports = () => new Proposal_Router();
