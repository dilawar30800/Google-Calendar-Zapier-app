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
  var attendees=[];
  for(var i=0;i<event.attendees.length;i++)
  {
    attendees.push({'email':event.attendees[i].email,'responseStatus':'accepted' });
  }
  const options = {
    url: `https://www.googleapis.com/calendar/v3/calendars/${bundle.inputData.calendar_id}/events/${bundle.inputData.event_id}`,
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${bundle.authData.access_token}`,
    },
    params: {},
    body: { 
     // attendees: attendees
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
  key: 'update_event_all',
  noun: 'event',
  display: {
    label: 'Update Event Status',
    description: 'To update an event from calendar to be accepted',
    hidden: false,
    important: true,
  },
};
