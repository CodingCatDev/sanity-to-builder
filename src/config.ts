import * as dotenv from 'dotenv';
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

import { createAdminApiClient } from '@builder.io/admin-sdk';
import SanityClientConstructor from '@sanity/client';

export const getBuilderClient = () => {
  const privateKey = process.env.BUILDER_PRIVATE_KEY;
  if (!privateKey) {
    const error = 'No Private Key Found, check .env';
    console.error(JSON.stringify(error));
    throw error;
  }
  return createAdminApiClient(privateKey);
};

export const getSanityClient = () => {
  if (
    !process.env.SANITY_PROJECT_ID ||
    !process.env.SANITY_DATASET ||
    !process.env.SANITY_API_TOKEN
  ) {
    const error = 'Check Sanity Keys, check .env';
    console.error(JSON.stringify(error));
    throw error;
  }
  return new SanityClientConstructor({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    apiVersion: '2021-05-19',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
  });
};
