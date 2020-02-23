const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/solar_project',  {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false

})
  .then(connection => {
    logger.log('Connected to MongoDB')
  })
  .catch(error => {
    logger.log(error.message)
  })
