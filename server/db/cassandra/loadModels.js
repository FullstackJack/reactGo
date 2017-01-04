const Promise = require('bluebird');
const models = require('./models');

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = (client) => {
  const promises = [];
  Object.keys(models).forEach(key => {
    const model = models[key];
    promises.push(new Promise((resolve, reject) => {
      console.log('modelName', key);
      console.log('load schema', model);
      const defaults = {
        table_name: key.toLowerCase(),
      };
      const schema = Object.assign({}, defaults, model);
      client.loadSchema(capitalize(key), schema, err => {
        if (err) { reject(err); }
        resolve(model);
      });
    }));
  });
  return Promise.all(promises).catch(err => {
     console.log(err);
  });
};
