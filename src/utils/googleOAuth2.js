import { OAuth2Client } from 'google-auth-library';
import { readFile } from 'node:fs/promises';
import * as path from 'node:path';

import { env } from './env.js';
import createHttpError from 'http-errors';

const clientId = env('GOOGLE_AUTH_CLIENT_ID');
const clientSecret = env('GOOGLE_AUTH_CLIENT_SECRET');

const oauthConfigPath = path.resolve('google-oauth.json');
const oatuhConfig = JSON.parse(await readFile(oauthConfigPath));

const redirectUri = oatuhConfig.web.redirect_uris[0];

const googleOAuthClient = new OAuth2Client({
  clientId,
  clientSecret,
  redirectUri,
});

export const generateGoogleOAuthUrl = () => {
  const url = googleOAuthClient.generateAuthUrl({
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  });

  return url;
};

export const validateCode = async (code) => {
  const response = await googleOAuthClient.getToken(code);
  if (!response.tokens.id_token) {
    throw createHttpError(401);
  }
  const ticket = await googleOAuthClient.verifyIdToken({
    idToken: response.tokens.id_token,
  });

  return ticket;
};
