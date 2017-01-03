import session from 'express-session';
import cassandra from 'cassandra-driver';
import connect from 'connect-cassandra-cql';
import config from './constants';

const client = new cassandra.Client(config.clientOptions);
const CassandraStore = connect(session);

export default () => new CassandraStore({ client });
