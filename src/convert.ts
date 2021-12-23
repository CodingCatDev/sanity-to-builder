import {
  getBuilderAdmin,
  getSanityClient,
  getBuilderClient,
  deleteBuilder,
  postBuilder,
  getAllBuilder,
} from './config';
import groq from 'groq';
const builderAdmin = getBuilderAdmin();
const builderClient = getBuilderClient();
const sanity = getSanityClient();

import { Timestamp } from 'firebase/firestore';

var MarkdownIt = require('markdown-it'),
  md = new MarkdownIt();
const prism = require('markdown-it-prism');

md.use(prism, {
  plugins: ['toolbar', 'copy-to-clipboard'],
  defaultLanguageForUnknown: 'javascript',
});

export enum PostType {
  post = 'post',
  tutorial = 'tutorial',
  podcast = 'podcast',
  course = 'course',
  lesson = 'lesson',
  page = 'page',
  group = 'group',
  forum = 'forum',
}

export const getSanityByType = async ({ type }: { type: PostType }) => {
  return await sanity.fetch(
    groq`*[!(_id in path("drafts.**")) && _type == '${type}'] | order(publishedAt asc)`
  );
};

(async () => {
  const posts = [];
  for (const type of [PostType.tutorial]) {
    const typeData = await getSanityByType({ type });
    posts.push(...typeData);
  }

  // Make builder from sanity
  for (const post of posts) {
    console.log(post.title);
    const builderPost = {
      // createdBy: "HYxMkZFRmMTuS5LD6DoM9GlsuXV2",
      // createdDate: 1639103686898,
      data: {
        page: {
          authors: [
            {
              _key: 'FWbCE9Ey7AjhZCRVpYnjD',
              _ref: '96637b34-1ea1-4342-9867-6bd4e94ed23d',
              _type: 'reference',
              author: {
                '@type': '@builder.io/core:Reference',
                id: 'd4652e9fa73543dc8a422e20608fc7d2',
                model: 'author',
              },
            },
          ],
          coverPhoto: post.coverPhoto,
          excerpt: post.excerpt,
          frameworks: [],
          title: post.title,
        },
        title: post.title,
        blocks: [
          {
            '@type': '@builder.io/sdk:Element',
            '@version': 2,
            id: 'builder-62ac4f6c34c14ebe892352f609715a87',
            component: {
              name: 'Custom Code',
              options: {
                code: md.render(post.content ? post.content : ''),
                scriptsClientOnly: true,
              },
            },
            responsiveStyles: {
              large: {
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                flexShrink: '0',
                boxSizing: 'border-box',
                marginTop: '20px',
              },
            },
          },
          {
            id: 'builder-pixel-c2kbne5e9ir',
            '@type': '@builder.io/sdk:Element',
            tagName: 'img',
            properties: {
              src: 'https://cdn.builder.io/api/v1/pixel?apiKey=303fa35cceca49e6ab548071602c8ebd',
              role: 'presentation',
              width: '0',
              height: '0',
            },
            responsiveStyles: {
              large: {
                height: '0',
                width: '0',
                display: 'inline-block',
                opacity: '0',
                overflow: 'hidden',
                pointerEvents: 'none',
              },
            },
          },
        ],
        url: `/${post._type}/${post.slug.current}`,
        state: {
          deviceSize: 'large',
          location: {
            path: '',
            query: {},
          },
        },
      },
      //   id: '74670e1ceab7451eb0b702baafa60d02',
      //   lastUpdatedBy: 'HYxMkZFRmMTuS5LD6DoM9GlsuXV2',
      meta: {
        hasLinks: false,
        kind: 'page',
        needsHydration: false,
      },
      //   modelId: '3346f48bd7cf4337aa99627827b24b4a',
      name: post.title,
      published: 'published',
      startDate: post.publishedAt
        ? new Date(post.publishedAt).getTime()
        : new Date().getTime(),
      query: [
        {
          '@type': '@builder.io/core:Query',
          operator: 'is',
          property: 'urlPath',
          value: `/${post._type}/${post.slug.current}`,
        },
      ],
      //   testRatio: 1,
      //   variations: {},
      //   lastUpdated: 1639104360504,
      //   screenshot:
      //     'https://cdn.builder.io/api/v1/image/assets%2F303fa35cceca49e6ab548071602c8ebd%2F0f51543d0b444ea5b949ac1605ac5ab2',
      //   rev: 'xxnkpz4c0ne',
    };
    const res = await postBuilder({ model: post._type, body: builderPost });
    // console.log(JSON.stringify(res));
  }
})();
