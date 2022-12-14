import jwt from 'jsonwebtoken';

export const exchangeCodeForToken = async (code: string, redirect_uri: string) => {
  const client_id = process.env.GOOGLE_CLIENT_ID;
  const client_secret = process.env.GOOGLE_CLIENT_SECRET;
  const grant_type = 'authorization_code';

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

export const getGoogleProfile = async (token: string) => {
  const profile = jwt.decode(token);
  return profile;
};