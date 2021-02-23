const authentication = require('./authentication');
const newEventTrigger = require('./triggers/new_event.js');
const updateEventCreate = require('./creates/update_event.js');
const updateEventAllCreate = require('./creates/update_event_all.js');
const updateSingleEventCreate = require('./creates/update_single_event.js');

module.exports = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication: authentication,
  triggers: { [newEventTrigger.key]: newEventTrigger },
  creates: {
    [updateEventCreate.key]: updateEventCreate,
    [updateEventAllCreate.key]: updateEventAllCreate,
    [updateSingleEventCreate.key]: updateSingleEventCreate,
  },
};
