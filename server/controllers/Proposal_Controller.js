// const bcrypt = require("bcrypt");
// const formidable = require("formidable");
const { validate_new_proposal } = require("../services/validator.js");
// const Socket_emitter = require('../socket_server.js').emit_event_to;
// const Socket_emitter = () => {
//   logger.log("Socet emitter");
// };

// var mongoose = require("mongoose");

var proposal_schema = require("../models/proposal_schema.js");
// const twilio = require("../services/twilio.js");
// const sendgrid = require("../services/sendgrid.js");

const Proposal = proposal_schema;
module.exports = Proposal;

module.exports.update_proposal = async (req, res, next) => {
  let updated_proposal = req.body;
  logger.log({ updated_proposal });
  logger.log("updated_proposal proposal!!");
  setTimeout(async () => {
    try {
      let valid = validate_new_proposal(updated_proposal);
      if (!valid) throw "Invalid proposal data";
      logger.log(`Find this id ${req.params.proposal_id}`);
      let proposal = await Proposal.findOneAndUpdate(
        {
          _id: req.params.proposal_id
        },
        { ...updated_proposal },
        {
          new: true
        }
      );

      return res.send(proposal);
    } catch (err) {
      logger.log({ err });
      return res.send({ err: true, msg: err });
    }
  }, 500);
};

module.exports.add_proposal = async (req, res, next) => {
  let new_proposal = req.body;
  logger.log({ new_proposal });
  logger.log("CREATE proposal!!");
  setTimeout(async () => {
    try {
      let valid = validate_new_proposal(new_proposal);
      logger.log({ valid });
      if (!valid) throw "Invalid proposal data";
      let saved_proposal = await new Proposal(new_proposal).save();
      logger.log({ saved_proposal });
      return res.send(saved_proposal);
    } catch (err) {
      logger.log({ err });
      if (err._message) {
        return res.send({ err: true, msg: err._message });
      } else {
        return res.send({ err: true, msg: err });
      }
    }
  }, 500);
};

module.exports.get_proposals = async (req, res, next) => {
  logger.log(req.user.id); /* Make sure proposals belong to this user */
  let proposals = await Proposal.find();
  // logger.log({proposals})
  return res.send(proposals);
};

module.exports.get_proposal = async (req, res, next) => {
  logger.log(req.params);
  return res.send(await Proposal.findById(req.params.proposal_id));
};

module.exports.get_proposal_by_email = async email => {
  try {
    const query = {
      primary_email: email
    };
    let proposal = await Proposal.findOne(query);
    return proposal;
  } catch (err) {
    throw err;
  }
};
