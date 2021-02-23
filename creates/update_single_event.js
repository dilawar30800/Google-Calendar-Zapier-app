const perform = (z, bundle) => {
  const options = {
    url: `https://www.googleapis.com/calendar/v3/calendars/${bundle.inputData.calendar_id}/events/${bundle.inputData.event_id}`,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${bundle.authData.access_token}`,
    },
    params: {},
    body: {
      start: {
        dateTime: '2020-11-14T11:00:00+05:00',
      },
      end: {
        dateTime: '2020-11-14T12:00:00+05:00',
      },
      attendees: [
        {
          email: bundle.inputData.email,
          responseStatus: 'accepted',
        },
      ],
    },
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.json;

    // You can do any parsing you need for results here before returning them

    return results;
  });
};

module.exports = {
  operation: {
    perform: perform,
    inputFields: [
      {
        key: 'calendar_id',
        label: 'Calendar ID',
        type: 'string',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'event_id',
        label: 'Event ID',
        type: 'string',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'email',
        label: 'Attendee Email',
        type: 'string',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
    ],
  },
  key: 'update_single_event',
  noun: 'event',
  display: {
    label: 'Update Event By Attendee Email',
    description: 'To update single attendee based upon email',
    hidden: false,
    important: true,
  },
};
