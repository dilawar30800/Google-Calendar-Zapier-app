const fetchEvent=async function(z,bundle)
{
  const options = {
  url: `https://www.googleapis.com/calendar/v3/calendars/${bundle.inputData.calendar_id}/events/${bundle.inputData.event_id}`,
  method: 'GET',
   headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${bundle.authData.access_token}`
  },
  body:{
 
  }
}

return await z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.json;
    return results;
  });
}


const perform = async (z, bundle) => {
  const event=await fetchEvent(z,bundle);
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
      start: event.start,
      end: event.end,
      attendees: [
        {
          email: 'bitf15a016@gmail.com',
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
    ],
  },
  key: 'update_event',
  noun: 'event',
  display: {
    label: 'Update Event',
    description: 'To update an event from calendar',
    hidden: false,
    important: true,
  },
};
