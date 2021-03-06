import { getTutorailBlocks } from './templates/tutorial';
import { getLessonBlocks } from './templates/lesson';
import { getPodcastBlocks } from './templates/podcast';
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
import {
  CodingCatBuilderContent,
  CodingCatBuilderContentPodcast,
  Data,
  PodcastData,
} from '../models/builder';
import { sleep } from './templates/general';
import { getPostBlocks } from './templates/post';

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

export const convertDataFromSanityToBuilder = async ({
  types,
}: {
  types: PostType[];
}) => {
  const posts = [];
  for (const type of types) {
    const typeData = await getSanityByType({ type });
    posts.push(...typeData);
  }

  // Make builder from sanity
  for (const post of posts) {
    console.log(post.title);
    const builderPost:
      | CodingCatBuilderContent
      | CodingCatBuilderContentPodcast = {
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
        state: {
          deviceSize: 'large',
          location: {
            path: '',
            query: {},
          },
        },
        title: post.title,
        url: `/${post._type}/${post.slug.current}`,
        blocks: [],
      },
      meta: {
        hasLinks: false,
        kind: 'page',
        needsHydration: false,
      },
      name: `NAME: ${post.title}`,
      published: 'published',
      query: [
        {
          '@type': '@builder.io/core:Query',
          operator: 'is',
          property: 'urlPath',
          value: `/${post._type}/${post.slug.current}`,
        },
      ],
    };

    // Podcast
    switch (post._type) {
      case PostType.podcast:
        builderPost.data = {
          ...builderPost.data,
          episode: post?.episode ? post?.episode : 99,
          season: post?.season ? post?.season : 99,
          recordingDate: post.recordingDate
            ? new Date(post.recordingDate).getTime()
            : new Date().getTime(),
          blocks: getPodcastBlocks({
            content: md.render(post?.content ? post.content : ''),
            youtube: post?.coverVideo?.url ? post?.coverVideo?.url : '',
            coverPhoto: post.coverPhoto,
          }),
        } as PodcastData;
        break;

      case PostType.lesson:
        builderPost.data = {
          ...builderPost.data,
          blocks: getLessonBlocks({
            content: md.render(post?.content ? post.content : ''),
            youtube: post?.coverVideo?.url ? post?.coverVideo?.url : '',
            coverPhoto: post.coverPhoto,
          }),
        } as PodcastData;
        break;

      case PostType.tutorial:
        builderPost.data = {
          ...builderPost.data,
          blocks: getTutorailBlocks({
            content: md.render(post?.content ? post.content : ''),
            youtube: post?.coverVideo?.url ? post?.coverVideo?.url : '',
            coverPhoto: post.coverPhoto,
          }),
        } as PodcastData;
        break;

      case PostType.post:
        builderPost.data = {
          ...builderPost.data,
          blocks: getPostBlocks({
            content: md.render(post?.content ? post.content : ''),
            youtube: post?.coverVideo?.url ? post?.coverVideo?.url : '',
            coverPhoto: post.coverPhoto,
          }),
        } as PodcastData;
        break;

      default:
        builderPost.data = {
          ...builderPost.data,

          blocks: getPostBlocks({
            content: md.render(post?.content ? post.content : ''),
            youtube: post?.coverVideo?.url ? post?.coverVideo?.url : '',
            coverPhoto: post.coverPhoto,
          }),
        } as Data;
        break;
    }

    const res = await postBuilder({ model: post._type, body: builderPost });
    await sleep(1000);
  }
};
