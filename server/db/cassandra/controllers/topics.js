import _ from 'lodash';
import Promise from 'bluebird';
import cassandra from 'express-cassandra';

/**
 * List
 */
export function all(req, res) {
  cassandra.instance.Topics.find({}, { raw: true }, (err, topics) => {
    if (err) {
      return res.status(500).send('Something went wrong getting the data.');
    }
    // Map the counter to the topic.
    Promise.map(topics, topic => {
      return cassandra.instance.TopicsCount.findOneAsync({ id: topic.id }, { raw: true }).then((counter) => {
        return { ...topic, count: parseInt(counter.count, 10) };
      });
    }).then(data => {
      return res.json(data);
    }).catch(err => {
      console.log(err);
      return res.status(500).send('Something went wrong getting the data.');
    });
  });
}

/**
 * Add a Topic
 */
export function add(req, res) {
  const topic = new cassandra.instance.Topics(req.body);
  topic.save(err => {
    if (err) {
      console.log(err);
      return res.status(400).send(err);
    }
    const query = { id: req.params.id };
    const count = cassandra.datatypes.Long.fromInt(1);
    const data = { count };
    cassandra.instance.TopicsCount.update(query, data, err => {
      if (err) {
        console.log(err);
        return res.status(400).send(err);
      }
      return res.status(200).send('OK');
    });
  });
}

/**
 * Update a topic
 */
export function update(req, res) {
  const query = { id: req.params.id };
  const isIncrement = req.body.isIncrement;
  // const isFull = req.body.isFull;
  // const omitKeys = ['id', '_id', '_v', 'isIncrement', 'isFull'];
  // const data = _.omit(req.body, omitKeys);
  const count = isIncrement ? cassandra.datatypes.Long.fromInt(1) : cassandra.datatypes.Long.fromInt(-1);

  cassandra.instance.TopicsCount.update(query, { count }, err => {
    if (err) {
      return res.status(500).send('We failed to save for some reason.');
    }
    return res.status(200).send('Updated successfully!');
  });
}

/**
 * Remove a topic
 */
export function remove(req, res) {
  const query = { id: req.params.id };
  // Delete topic
  cassandra.instance.Topics.delete(query, err => {
    if (err) {
      console.log('Error on delete', err);
      return res.status(500).send('We failed to delete for some reason');
    }

    // Delete topic count
    cassandra.instance.TopicsCount.delete(query, err => {
      if (err) {
        console.log('Error on delete', err);
        return res.status(500).send('We failed to delete for some reason');
      }
      return res.status(200).send('Removed Successfully!');
    });
  });
}

export default {
  all,
  add,
  update,
  remove
};
