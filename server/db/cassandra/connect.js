import cassandra from 'express-cassandra';
import config from './constants';
import loadModels from './loadModels';

let client = null;

export function getClient() {
  return client;
}

export default () => {
  client = cassandra.createClient(config);
  console.log('cassandra', cassandra);
  console.log('client', client);
  return client.connectAsync().then(() => {
    console.log('===>  Succeeded in connecting to Cassandra');
    loadModels(client).then(res => {
      console.log('===>  Succeeded in building models from schemas.');
      return res;
    }).catch(err => {
      console.log('===>  Error building schemas.');
      console.log(`Reason: ${err}`);
      throw new Error(err);
    });
  });
};
