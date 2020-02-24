module.exports = {
  validate_new_worker,
  validate_new_proposal
};

function validate_new_proposal(proposal) {
  /* just make sure there is a first and last name */
  logger.log({ proposal });
  logger.log("validate_new_proposal");

  if (proposal.worker == "Select Worker") {
    logger.log("validate_new_proposal false");
    return false;
  } else {
    logger.log("validate_new_proposal true");
    return true;
  }
}

function validate_new_worker(worker) {
  /* just make sure data is not blank */
  logger.log({ worker });
  logger.log("validate_new_worker");
  for (let key in worker) {
    try {
      logger.log({key, val:worker[key]})
      let val = worker[key].trim();
    if (val === "") {
      logger.log(`${key} is blank`);
      return false
    }
      /*
  slice the services
  */
 if(!Array.isArray(worker.services) && worker.services.length){

  let services = worker.services.split(",");
  services = services.map(service => service.trim());
  services = services.filter(service => service !== "");
  worker.services = services;
 }
    worker[key] = val;
    } catch (err) {
      logger.log('err'.bgRed)
      logger.log(err)
    }
  }
  logger.log({worker})


  return worker;
}
