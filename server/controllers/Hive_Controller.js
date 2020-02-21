const bcrypt = require("bcrypt");
const formidable = require("formidable");


var worker_schema = require("../models/worker_schema.js");


const Worker = worker_schema;
module.exports = Worker;


module.exports.get_all_workers = async (req, res, next) => {
    logger.log('request to get all workers')
    let allWorkers = await Worker.find()
    res.json(allWorkers)
  
};

module.exports.create_worker = async(req, res, next) => {
    logger.log('create  a new worker')
    let worker = req.body
    let {services} = worker
    services = services.split(',')
    services = services.map(s=>s.trim())
    worker.services = services
    logger.log({worker})
    try {
        let newWorker = await new Worker(worker).save();
      return res.send(newWorker);
    } catch (err) {
        logger.log('ERRRRRR')
        logger.log(err)
        if(err.errmsg.includes('primary_email_1 dup key: { primary_email')){
            err.msg = `The email "${worker.primary_email}" already exists`
        }
        logger.log(err)
        return res.send({err})
    }
};



module.exports.get_worker_by_id = (id, cb) => {
  Worker.findById(id, cb);
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




module.exports.upload_profile_imgs = async (req, res, next) => {
    logger.log(req.body);
    const form = new formidable.IncomingForm();
    form.multiples = true;
    form.uploadDir = __dirname + "/../../next_app/static/worker_profile_imgs";
  
    // every time a file has been uploaded successfully,
    // rename it to it's orignal name
    form.on("file", function(field, file) {
      logger.log("field - " + field + " : file - " + JSON.stringify(file));
      let ext = file.name;
      const index = ext.lastIndexOf(".");
      ext = ext.slice(index);
      logger.log("whats the upload file?");
      logger.log(file.path);
      var file_name = file.path.split("/");
      file_name = file_name[file_name.length - 1];
  
      Worker.findByIdAndUpdate(
        {
          _id: req.worker.id
        },
        {
          main_profile_img: file_name,
          $push: {
            profile_imgs: file_name
          }
        },
        {
          new: true
        },
        (err, updated_worker_profile) => {
          if (err) throw "error saving uploaded crowdsale photo";
          logger.log("Image uploaded");
          res.send(updated_worker_profile.profile_imgs);
        }
      );
  
      // resizeThisImage(file.path + ext)//TODO add Jimp
    });
    // log any errors that occur
    form.on("error", function(err) {
      logger.log("An error has occured: \n" + err);
    });
  
    // once all the files have been uploaded, send a response to the client
    form.on("end", function() {
      logger.log("end");
      setTimeout(() => {}, 1000);
    });
  
    // parse the incoming request containing the form data
    form.parse(req);
    // logger.log(form)
    logger.log(req.file);
    logger.log(req.files);
  };
  
  