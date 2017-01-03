import cassandra from 'express-cassandra';
import config from './constants';

export default () => {
    const connect = () => {
      cassandra.setDirectory(`${process.cwd()}/server/db/cassandra/models`).bind(config, err => {
      if (err) {
        console.log('===>  Error connecting to Cassandra');
        console.log(`Reason: ${err}`);
        throw new Error(err);
      } else {
        console.log('===>  Succeeded in connecting to Cassandra');
      }
    });
  };

  return connect();
};
