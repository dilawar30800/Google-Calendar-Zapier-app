module.exports = {
  type: 'oauth2',
  test: {
    url: 'https://www.googleapis.com/calendar/v3/users/me/calendarList',
    method: 'GET',
    params: {},
    headers: { Authorization: 'Bearer {{bundle.authData.access_token}}' },
    body: {},
    removeMissingValuesFrom: {},
  },
  oauth2Config: {
    authorizeUrl: {
      method: 'GET',
      url: 'https://accounts.google.com/o/oauth2/v2/auth',
      params: {
        client_id: '{{process.env.CLIENT_ID}}',
        state: '{{bundle.inputData.state}}',
        redirect_uri: '{{bundle.inputData.redirect_uri}}',
        response_type: 'code',
        access_type: 'offline',
      },
    },
    getAccessToken: {
      url: 'https://oauth2.googleapis.com/token',
      method: 'POST',
      params: {},
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        accept: 'application/json',
      },
      body: {
        code: '{{bundle.inputData.code}}',
        client_id: '{{process.env.CLIENT_ID}}',
        client_secret: '{{process.env.CLIENT_SECRET}}',
        grant_type: 'authorization_code',
        redirect_uri: '{{bundle.inputData.redirect_uri}}',
         access_type: 'offline',
      },
      removeMissingValuesFrom: {},
    },
    refreshAccessToken: {
      url: 'https://oauth2.googleapis.com/token',
      method: 'POST',
      params: {},
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        accept: 'application/json',
      },
      body: {
        refresh_token: '{{bundle.authData.refresh_token}}',
        grant_type: 'refresh_token',
        client_id: '{{process.env.CLIENT_ID}}',
        client_secret: '{{process.env.CLIENT_SECRET}}',
      },
      removeMissingValuesFrom: {},
    },
    scope:
      'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.events.readonly https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.settings.readonly',
    autoRefresh: true,
  },
};
