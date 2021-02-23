const perform = (z, bundle) => {
  const options = {
    url:
      'https://www.googleapis.com/calendar/v3/calendars/bitf15a016@gmail.com/events',
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${bundle.authData.access_token}`,
    },
    params: {},
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.json;

    // You can do any parsing you need for results here before returning them

    return results.items;
  });
};

module.exports = {
  operation: { perform: perform },
  key: 'new_event',
  noun: 'Event',
  display: {
    label: 'Get All Events',
    description: 'To get all events of a calendar',
    hidden: false,
    important: true,
  },
};
