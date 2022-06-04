import * as dotenv from 'dotenv';
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

import { createAdminApiClient } from '@builder.io/admin-sdk';
import { builder } from '@builder.io/sdk';
import SanityClientConstructor from '@sanity/client';
const fetch = require('node-fetch');
import { Client } from '@notionhq/client';

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

export const getNotionClient = () => {
  if (!process.env.NOTION_TOKEN) {
    const error = 'Check Notion Keys, check .env';
    console.error(JSON.stringify(error));
    throw error;
  }
  return new Client({
    auth: process.env.NOTION_TOKEN,
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

export const createFrameworkLanguageNotionPage = async ({
  databaseId,
  title,
  slug,
  excerpt,
}: {
  databaseId: string;
  title: string;
  slug: string;
  excerpt: string;
}) => {
  return await getNotionClient().pages.create({
    parent: {
      database_id: databaseId,
    },
    properties: {
      title: {
        title: [
          {
            text: {
              content: title,
            },
          },
        ],
      },
      slug: {
        url: slug,
      },
      excerpt: {
        rich_text: [
          {
            text: {
              content: excerpt,
            },
          },
        ],
      },
    },
  });
};

export const createBuilderPostNotionPage = async ({
  model,
  databaseId,
}: {
  model: string;
  databaseId: string;
}) => {
  const builderModel = await getAllBuilder({ model });

  for (const m of builderModel.results) {
    console.log(m.data?.page?.title);
    console.log(m.data?.url);
    await getNotionClient().pages.create({
      parent: {
        database_id: databaseId,
      },
      properties: {
        title: {
          title: [
            {
              text: {
                content: m.data?.page?.title || 'Missing',
              },
            },
          ],
        },
        slug: {
          url: m.data?.url?.split('/').at(2)
            ? m.data?.url?.split('/').at(2)
            : m.data?.url || null,
        },
        excerpt: {
          rich_text: [
            {
              text: {
                content: m.data?.page?.excerpt || '',
              },
            },
          ],
        },
        cover: {
          url: m.data?.page?.coverPhoto?.url || null,
        },
        authors: {
          relation: [
            {
              id: 'd3f8291f-8d55-4240-bcb5-831e68b4591c',
            },
          ],
        },
        published: {
          select: {
            name: 'published',
          },
        },
      },
    });
  }
};
