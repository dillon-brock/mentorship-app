import jwt from 'jsonwebtoken';

const exchangeCodeForToken = async (code: string) => {
  const client_id = process.env.GOOGLE_CLIENT_ID;
  const client_secret = process.env.GOOGLE_CLIENT_SECRET;
  const grant_type = 'authorization_code';
  const redirect_uri = process.env.GGL_REDIRECT_URI;

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id,
      client_secret,
      grant_type,
      code,
      redirect_uri,
    }),
  });

  const resp = await response.json();
  return resp.id_token;
};

const getGoogleProfile = async (token: string) => {
  const profile = jwt.decode(token);
  return profile;
};

module.exports = {
  exchangeCodeForToken,
  getGoogleProfile,
};