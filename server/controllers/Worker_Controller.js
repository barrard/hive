// const bcrypt = require("bcrypt");
// const formidable = require("formidable");
const {validate_new_worker} = require('../services/validator.js')
// const Socket_emitter = require('../socket_server.js').emit_event_to;
// const Socket_emitter = () => {
//   logger.log("Socet emitter");
// };

// var mongoose = require("mongoose");

var worker_schema = require("../models/worker_schema.js");
// const twilio = require("../services/twilio.js");
// const sendgrid = require("../services/sendgrid.js");

const Worker = worker_schema;
module.exports = Worker;




module.exports.update_worker = async (req, res, next) => {
  let updated_worker = req.body
  logger.log({updated_worker})
  logger.log('updated_worker WORKER!!')
  setTimeout(async()=>{
    try {
      update_worker = validate_new_worker(updated_worker)
      if(!update_worker)throw 'Invalid worker data'
      logger.log(`Find this id ${req.params.worker_id}`)
      let worker = await Worker.findOneAndUpdate({
        _id: req.params.worker_id}, {...updated_worker}, {
          new:true
        });

      return res.json(worker);
    } catch (err) {
      logger.log({err})
      return res.json({err:true, msg:err});
    }
  }, 500)

};


module.exports.add_worker = async (req, res, next) => {
  let new_worker = req.body
  logger.log({new_worker})
  logger.log('CREATE WORKER!!')
  setTimeout(async()=>{
    try {
      new_worker = validate_new_worker(new_worker)
      if(!new_worker)throw 'Invalid worker data'
      let worker = await new Worker(new_worker).save();
      return res.json(worker);
    } catch (err) {
      logger.log({err})
      return res.json({err:true, msg:err});
    }
  }, 500)

};



module.exports.get_workers = async (req, res, next) => {
  logger.log(req.user.id)/* Make sure workers belong to this user */
  let workers = await Worker.find();
  // logger.log({workers})
  res.json(workers)
};


module.exports.get_worker = async (req, res, next) => {
  logger.log(req.params)
  res.json(

    await Worker.findById(req.params.worker_id)
  )
};

module.exports.get_worker_by_email = async email => {
  try {
    const query = {
      primary_email: email
    };
    let worker = await Worker.findOne(query);
    return worker;
  } catch (err) {
    throw err;
  }
};



