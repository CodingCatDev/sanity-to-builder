import * as dotenv from 'dotenv';
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

import { createAdminApiClient } from '@builder.io/admin-sdk';
import { builder } from '@builder.io/sdk';
import SanityClientConstructor from '@sanity/client';
const fetch = require('node-fetch');

export const getBuilderAdmin = () => {
  const privateKey = process.env.BUILDER_PRIVATE_KEY;
  if (!privateKey) {
    const error = 'No Private Key Found, check .env';
    console.error(JSON.stringify(error));
    throw error;
  }
  return createAdminApiClient(privateKey);
};

export const getBuilderClient = () => {
  const privateKey = process.env.BUILDER_KEY;
  if (!privateKey) {
    const error = 'No Private Key Found, check .env';
    console.error(JSON.stringify(error));
    throw error;
  }
  return builder.init(privateKey);
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

export const postBuilder = async ({
  model,
  body,
}: {
  model: string;
  body: object;
}) => {
  try {
    const response = await fetch(`https://builder.io/api/v1/write/${model}`, {
      method: 'post',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.BUILDER_PRIVATE_KEY}`,
      },
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (e) {
    console.error(JSON.stringify(e));
  }
};

export const patchBuilder = async ({
  model,
  id,
  body,
}: {
  model: string;
  id: string;
  body: object;
}) => {
  try {
    const response = await fetch(
      `https://builder.io/api/v1/write/${model}/${id}`,
      {
        method: 'patch',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.BUILDER_PRIVATE_KEY}`,
        },
      }
    );
    if (response.ok) {
      return response.json();
    }
  } catch (e) {
    console.error(JSON.stringify(e));
  }
};

export const putBuilder = async ({
  model,
  id,
  body,
}: {
  model: string;
  id: string;
  body: object;
}) => {
  try {
    const response = await fetch(
      `https://builder.io/api/v1/write/${model}/${id}`,
      {
        method: 'put',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.BUILDER_PRIVATE_KEY}`,
        },
      }
    );
    if (response.ok) {
      return response.json();
    }
  } catch (e) {
    console.error(JSON.stringify(e));
  }
};

export const deleteBuilder = async ({
  model,
  id,
}: {
  model: string;
  id: string;
}) => {
  try {
    const response = await fetch(
      `https://builder.io/api/v1/write/${model}/${id}`,
      {
        method: 'delete',
        headers: {
          Authorization: `Bearer ${process.env.BUILDER_PRIVATE_KEY}`,
        },
      }
    );
    if (response.ok) {
      return response.json();
    }
  } catch (e) {
    console.error(JSON.stringify(e));
  }
};
export const getAllBuilder = async ({
  model,
  includeUnpublished = true,
  limit = 1000,
  published,
}: {
  model: string;
  includeUnpublished?: boolean;
  limit?: number;
  published?: 'published' | 'archived' | 'draft';
}) => {
  try {
    const response = await fetch(
      `https://builder.io/api/v2/content/${model}?apiKey=${process.env.BUILDER_KEY}` +
        `&preview=true&noCache=true&cachebust=true&includeUnpublished=${includeUnpublished}&limit=${limit}` +
        (published ? `&query.published=${published}` : ''),
      {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.BUILDER_KEY}`,
        },
      }
    );
    if (response.ok) {
      return response.json();
    }
  } catch (e) {
    console.error(JSON.stringify(e));
  }
};
export const getBuilder = async ({
  model,
  id,
}: {
  model: string;
  id: string;
}) => {
  try {
    const response = await fetch(
      `https://builder.io/api/v2/content/${model}/${id}?apiKey=${process.env.BUILDER_KEY}&preview=true&noCache=true&cachebust=true&includeUnpublished=true`,
      {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.BUILDER_KEY}`,
        },
      }
    );
    if (response.ok) {
      return response.json();
    }
  } catch (e) {
    console.error(JSON.stringify(e));
  }
};
