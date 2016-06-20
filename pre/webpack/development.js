const config = require('./config.json')[process.env.NODE_ENV];
module.exports = () => {
  console.log('this is development:', config);
}
