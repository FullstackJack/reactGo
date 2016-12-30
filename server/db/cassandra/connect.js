import cassandra from 'cassandra-driver';
// import { db } from './constants';
// import loadModels from './models';

export default () => {
  // Find the appropriate database to connect to, default to localhost if not found.
  const connect = () => {
    const client = new cassandra.Client({
      contactPoints: ['127.0.0.1'],
    });

    client.connect(err => {
      if (err) {
        console.log('===>  Error connecting to Cassandra');
        console.log(`Reason: ${err}`);
      } else {
        console.log('===>  Succeeded in connecting to Cassandra');
      }
      return client;
    });
  };
  connect();

  // loadModels();
};
