const bcrypt = require("bcrypt");
const formidable = require("formidable");

// const Socket_emitter = require('../socket_server.js').emit_event_to;
// const Socket_emitter = () => {
//   logger.log("Socet emitter");
// };

// var mongoose = require("mongoose");

var user_schema = require("../models/user_schema.js");
// const twilio = require("../services/twilio.js");
// const sendgrid = require("../services/sendgrid.js");

const User = user_schema;
module.exports = User;


module.exports.upload_profile_imgs = async (req, res, next) => {
  logger.log(req.body);
  const form = new formidable.IncomingForm();
  form.multiples = true;
  form.uploadDir = __dirname + "/../../next_app/static/user_profile_imgs";

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

    User.findByIdAndUpdate(
      {
        _id: req.user.id
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
      (err, updated_user_profile) => {
        if (err) throw "error saving uploaded crowdsale photo";
        logger.log("Image uploaded");
        res.send(updated_user_profile.profile_imgs);
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



module.exports.get_user_by_id = (id, cb) => {
  User.findById(id, cb);
};
module.exports.get_user_by_email = async email => {
  try {
    const query = {
      primary_email: email
    };
    let user = await User.findOne(query);
    return user;
  } catch (err) {
    throw err;
  }
};

module.exports.compare_password = async (password, hash) => {
  try {
    let is_match = await bcrypt.compare(password, hash);
    return is_match;
  } catch (err) {
    throw err;
  }
};

module.exports.create_user = new_user => {
  // logger.log('CREATE USER!!')
  return new Promise(async function(resolve, reject) {
    try {
      // logger.log('CREATE USER!!')

      let salt = await bcrypt.genSalt(10);
      let hash = await bcrypt.hash(new_user.password, salt);
      new_user.password = hash;
      let user = await new_user.save();
      resolve(user);
    } catch (err) {
      reject(err);
    }
  });
};
