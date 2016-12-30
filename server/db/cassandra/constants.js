export const keyspace = 'ks1';
export const contactPoints = ['127.0.0.1'];
export const protocolOptions = { port: 9042 };
export const defaultReplicationStrategy = {
  class: 'SimpleStrategy',
  replication_factor: 1
};
export const migration = process.env.NODE_ENV === 'production' ? 'safe' : 'alter';
export const createKeyspace = true;

export default {
  clientOptions: {
    keyspace,
    contactPoints,
    protocolOptions,
  },
  ormOptions: {
    defaultReplicationStrategy,
    migration,
    createKeyspace
  }
};
