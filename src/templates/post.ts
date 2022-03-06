import { Block, CoverPhoto } from '../../models/builder';
import { getCover } from './general';

export const getPostBlocks = ({
  content,
  youtube,
  coverPhoto,
}: {
  content: string;
  youtube: string;
  coverPhoto: CoverPhoto;
}): Block[] => [
  {
    '@type': '@builder.io/sdk:Element',
    '@version': 2,
    layerName: 'Podcast Template',
    id: 'builder-1c9b67fe775a49779014dcc73771cc0a',
    children: [
      getCover({ youtube, coverPhoto }),
      {
        '@type': '@builder.io/sdk:Element',
        '@version': 2,
        id: 'builder-3e00703afeb24e85bccb54e0e110b5af',
        component: {
          name: 'BreakBarLeft',
          options: {},
        },
        children: [
          {
            '@type': '@builder.io/sdk:Element',
            '@version': 2,
            id: 'builder-ebc66f1c30da4ae192d429dd2f9d3938',
            class: 'grid w-full gap-4',
            children: [
              {
                '@type': '@builder.io/sdk:Element',
                '@version': 2,
                layerName: 'Title and Back Button',
                id: 'builder-7210aa472cbb4fdcad7bda779adf7782',
                class: 'grid items-center justify-between gap-2 lg:flex',
                children: [
                  {
                    '@type': '@builder.io/sdk:Element',
                    '@version': 2,
                    bindings: {
                      'component.options.text':
                        'var _virtual_index=context.builderContent.data.title;return _virtual_index',
                    },
                    code: {
                      bindings: {
                        'component.options.text':
                          'context.builderContent.data.title',
                      },
                    },
                    layerName: 'Title',
                    tagName: 'h1',
                    id: 'builder-bc8f77ce3b844b799fa066f05f37e88f',
                    class:
                      'self-center font-sans text-2xl lg:flex-1 sm:text-4xl text-basics-50 dark:text-basics-50',
                    component: {
                      name: 'Text',
                      options: {
                        text: '<p>Enter some text...</p>',
                      },
                    },
                  },
                  {
                    '@type': '@builder.io/sdk:Element',
                    '@version': 2,
                    id: 'builder-1d4f594022a042f09b25c43dcd084398',
                    class: 'flex-shrink0',
                    component: {
                      name: 'NextLink',
                      options: {
                        href: '/blog',
                      },
                    },
                    children: [
                      {
                        '@type': '@builder.io/sdk:Element',
                        '@version': 2,
                        id: 'builder-76800f64117a47428ad0e88919b2d964',
                        class: 'flex-shrink-0',
                        children: [
                          {
                            '@type': '@builder.io/sdk:Element',
                            '@version': 2,
                            id: 'builder-6510f6f3840840c399f824bf5b31d4f5',
                            class: 'btn-secondary',
                            component: {
                              name: 'Core:Button',
                              options: {
                                text: 'back to Blog',
                              },
                            },
                          },
                        ],
                      },
                    ],
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
                ],
              },
              {
                '@type': '@builder.io/sdk:Element',
                '@version': 2,
                layerName: 'Header',
                id: 'builder-8081ce313d60439c935ad08074643998',
                class: 'grid items-center justify-between gap-2 lg:flex',
                children: [
                  {
                    '@type': '@builder.io/sdk:Element',
                    '@version': 2,
                    layerName: 'Authors',
                    id: 'builder-9bdbff1e1b1f481d939e64050465f408',
                    class:
                      'flex flex-wrap gap-2 2xl:flex-nowrap text-basics-50 dark:text-basics-50',
                    children: [
                      {
                        '@type': '@builder.io/sdk:Element',
                        '@version': 2,
                        repeat: {
                          collection: 'state?.modelData?.data?.page?.authors',
                        },
                        layerName: 'section',
                        id: 'builder-29a74ce1651a4720b658c74f4f204c9c',
                        class: 'flex items-center flex-shrink-0 space-x-4',
                        children: [
                          {
                            '@type': '@builder.io/sdk:Element',
                            '@version': 2,
                            bindings: {
                              _newProperty:
                                'var _virtual_index=state.$item.author.value.data.photoUrl.public_id;return _virtual_index',
                            },
                            code: {
                              bindings: {
                                _newProperty:
                                  'state.$item.author.value.data.photoUrl.public_id',
                              },
                            },
                            id: 'builder-4f55fc9a139e4a738fc5af9b34d14b97',
                            component: {
                              name: 'NextImage',
                              options: {
                                src: 'ajonp-ajonp-com/authors/alex_headshot',
                                layout: 'fixed',
                                height: 50,
                                width: 50,
                                alt: 'An image description',
                                className:
                                  'w-12 border-2 rounded-full border-primary-50 dark:border-primary-50',
                              },
                            },
                          },
                          {
                            '@type': '@builder.io/sdk:Element',
                            '@version': 2,
                            id: 'builder-eb9d95ab5cc14d9dab05026893c682ca',
                            class: 'grid content-start',
                            children: [
                              {
                                '@type': '@builder.io/sdk:Element',
                                '@version': 2,
                                id: 'builder-9fb8d01f3f04458b9e1e8139bbe75dbe',
                                class: 'm-0 text-base font-light',
                                component: {
                                  name: 'Text',
                                  options: {
                                    text: '<p>Author</p>',
                                  },
                                },
                              },
                              {
                                '@type': '@builder.io/sdk:Element',
                                '@version': 2,
                                bindings: {
                                  'component.options.text':
                                    'var _virtual_index=state.$item.author.value.data.displayName;return _virtual_index',
                                },
                                code: {
                                  bindings: {
                                    'component.options.text':
                                      'state.$item.author.value.data.displayName',
                                  },
                                },
                                id: 'builder-920b835c358949eabea3c4418a0c5729',
                                class: 'm-0 font-sans text-xl',
                                component: {
                                  name: 'Text',
                                  options: {
                                    text: '<p>Author</p>',
                                  },
                                },
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    '@type': '@builder.io/sdk:Element',
                    '@version': 2,
                    layerName: 'Date',
                    id: 'builder-4a5e1239088342ca8134ea95fec4a1ee',
                    class: 'flex items-center flex-shrink-0 space-x-4',
                    children: [
                      {
                        '@type': '@builder.io/sdk:Element',
                        '@version': 2,
                        id: 'builder-b1eb35c64a5f46dfb89a402b6a12e204',
                        children: [
                          {
                            '@type': '@builder.io/sdk:Element',
                            '@version': 2,
                            id: 'builder-f0a221e31ba0405bbbb54019791f29d1',
                            class: 'text-basics-50 w-8 h-8',
                            component: {
                              name: 'Custom Code',
                              options: {
                                code: '<svg\n  xmlns="http://www.w3.org/2000/svg"\n  viewBox="0 0 20 20"\n  width="100%"\n  height="100%"\n  fill="currentColor"\n  class="jsx-96a72b765bd73b49 w-6"\n>\n  <path\n    fill-rule="evenodd"\n    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"\n    clip-rule="evenodd"\n    class="jsx-96a72b765bd73b49"\n  ></path>\n</svg>\n',
                                scriptsClientOnly: true,
                              },
                            },
                          },
                          {
                            '@type': '@builder.io/sdk:Element',
                            '@version': 2,
                            bindings: {
                              'component.options.text':
                                'var _virtual_index=new Date(null===state||void 0===state?void 0:state.modelData.createdDate).toLocaleDateString();return _virtual_index',
                            },
                            code: {
                              bindings: {
                                'component.options.text':
                                  'new Date(state?.modelData.createdDate).toLocaleDateString()',
                              },
                            },
                            layerName: 'Date',
                            id: 'builder-2ec1ae815f1244919da002a14aed25db',
                            class: 'text-basics-50',
                            component: {
                              name: 'Text',
                              options: {
                                text: 'Enter some text...',
                              },
                            },
                          },
                        ],
                        responsiveStyles: {
                          large: {
                            display: 'flex',
                            flexDirection: 'row',
                          },
                        },
                      },
                      {
                        '@type': '@builder.io/sdk:Element',
                        '@version': 2,
                        bindings: {
                          show: 'var _virtual_index=null===state||void 0===state?void 0:state.modelData.lastUpdated;return _virtual_index',
                        },
                        code: {
                          bindings: {
                            show: 'state?.modelData.lastUpdated',
                          },
                        },
                        id: 'builder-ce601b9166524bc2a0ed16f99be43501',
                        children: [
                          {
                            '@type': '@builder.io/sdk:Element',
                            '@version': 2,
                            layerName: 'Custom Code',
                            id: 'builder-5549e11ca1dc4027ba4c28e0eb023763',
                            class: 'text-basics-50 w-8',
                            component: {
                              name: 'Custom Code',
                              options: {
                                code: '<svg\n  xmlns="http://www.w3.org/2000/svg"\n  xmlns:xlink="http://www.w3.org/1999/xlink"\n  viewBox="0 0 24 24"\n  xml:space="preserve"\n  width="100%"\n  height="100%"\n  fill="currentColor"\n>\n  <defs xmlns="http://www.w3.org/2000/svg">\n    <path id="a" d="M0 0h24v24H0V0z"></path>\n  </defs>\n  <clipPath xmlns="http://www.w3.org/2000/svg" id="b">\n    <use\n      xmlns:xlink="http://www.w3.org/1999/xlink"\n      overflow="visible"\n      xlink:href="#a"\n    ></use>\n  </clipPath>\n  <path\n    xmlns="http://www.w3.org/2000/svg"\n    d="M21 10.12h-6.78l2.74-2.82c-2.73-2.7-7.15-2.8-9.88-.1a6.875 6.875 0 0 0 0 9.79 7.02 7.02 0 0 0 9.88 0C18.32 15.65 19 14.08 19 12.1h2c0 1.98-.88 4.55-2.64 6.29-3.51 3.48-9.21 3.48-12.72 0-3.5-3.47-3.53-9.11-.02-12.58a8.987 8.987 0 0 1 12.65 0L21 3v7.12zM12.5 8v4.25l3.5 2.08-.72 1.21L11 13V8h1.5z"\n    clip-path="url(#b)"\n  ></path>\n</svg>\n',
                                scriptsClientOnly: true,
                              },
                            },
                          },
                          {
                            '@type': '@builder.io/sdk:Element',
                            '@version': 2,
                            bindings: {
                              'component.options.text':
                                'var _virtual_index=new Date(null===state||void 0===state?void 0:state.modelData.lastUpdated).toLocaleDateString();return _virtual_index',
                            },
                            code: {
                              bindings: {
                                'component.options.text':
                                  'new Date(state?.modelData.lastUpdated).toLocaleDateString()',
                              },
                            },
                            id: 'builder-0360876549dc4f60aff0902c8fdd6860',
                            class: 'text-basics-50',
                            component: {
                              name: 'Text',
                              options: {
                                text: 'Enter some text...',
                              },
                            },
                          },
                        ],
                        responsiveStyles: {
                          large: {
                            display: 'flex',
                            flexDirection: 'row',
                          },
                        },
                      },
                    ],
                  },
                  {
                    '@type': '@builder.io/sdk:Element',
                    '@version': 2,
                    bindings: {
                      'component.options.href':
                        'var _virtual_index=""+state.location.host+state.location.pathname;return _virtual_index',
                      'component.options.excerpt':
                        'var _virtual_index=state.builderContent.data.page.excerpt;return _virtual_index',
                      'component.options.title':
                        'var _virtual_index=state.builderContent.data.page.title;return _virtual_index',
                    },
                    code: {
                      bindings: {
                        'component.options.href':
                          '`${state.location.host}${state.location.pathname}`',
                        'component.options.excerpt':
                          'state.builderContent.data.page.excerpt',
                        'component.options.title':
                          'state.builderContent.data.page.title',
                      },
                    },
                    id: 'builder-b194e4d11bd4471eacc915a8124820cd',
                    class: 'flex flex-wrap gap-4 md:flex-nowrap css-0',
                    component: {
                      name: 'SocialShare',
                      options: {},
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        '@type': '@builder.io/sdk:Element',
        '@version': 2,
        layerName: 'Main Content',
        id: 'builder-b5058dacbacc4192a97eb47d76ad44e6',
        children: [
          {
            '@type': '@builder.io/sdk:Element',
            '@version': 2,
            id: 'builder-3fb1b403852e4fd09c38bdf3df47e7f2',
            component: {
              name: 'Embed',
              options: {
                content:
                  '<div style="left: 0; width: 100%; height: 152px; position: relative;"><iframe src="https://open.spotify.com/embed/episode/34dNMpOmT5jtHbecQQz2ND?utm_source=oembed" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen allow="encrypted-media;"></iframe></div>',
                url: 'https://open.spotify.com/episode/34dNMpOmT5jtHbecQQz2ND?si=zcwF-DlyRnKVvNwBookw7w',
              },
            },
            responsiveStyles: {
              large: {
                marginTop: '20px',
                marginBottom: '20px',
              },
            },
          },
          {
            '@type': '@builder.io/sdk:Element',
            '@version': 2,
            layerName: 'Layout',
            id: 'builder-ad19d297a94b4e19ba8a98b8d508cd78',
            class:
              'grid grid-cols-1 gap-4 p-1 lg:p-10 2xl:grid-cols-sidebar 2xl:pl-10',
            children: [
              {
                '@type': '@builder.io/sdk:Element',
                '@version': 2,
                layerName: 'Left',
                tagName: 'article',
                id: 'builder-c6e5144b027c4ed8821e87462e1e6c61',
                class: 'article-content min-w-0 max-w-full',
                children: [
                  {
                    '@type': '@builder.io/sdk:Element',
                    '@version': 2,
                    id: 'builder-bffcb70944bb4fdb89a14163209d54d9',
                    component: {
                      name: 'Text',
                      options: {
                        text: content,
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
                        lineHeight: 'normal',
                        height: 'auto',
                        textAlign: 'left',
                      },
                    },
                  },
                ],
              },
              {
                '@type': '@builder.io/sdk:Element',
                '@version': 2,
                layerName: 'Right',
                id: 'builder-26f420366cec4c38949b73ee1e13f1a2',
                class:
                  'grid content-start grid-cols-1 row-start-2 gap-4 2xl:col-start-2 2xl:row-start-1 min-w-0 max-w-full',
                children: [
                  {
                    '@type': '@builder.io/sdk:Element',
                    '@version': 2,
                    bindings: {
                      'component.options.posts':
                        'var _a,_virtual_index=null===(_a=null===state||void 0===state?void 0:state.recentPosts)||void 0===_a?void 0:_a.course;return _virtual_index',
                    },
                    code: {
                      bindings: {
                        'component.options.posts': 'state?.recentPosts?.course',
                      },
                    },
                    id: 'builder-77572298c7b14837abaf0df8111c4e54',
                    component: {
                      name: 'RecentPostsList',
                      options: {
                        title: 'Recent Courses',
                      },
                    },
                    responsiveStyles: {
                      large: {
                        marginTop: '20px',
                      },
                    },
                  },
                  {
                    '@type': '@builder.io/sdk:Element',
                    '@version': 2,
                    bindings: {
                      'component.options.posts':
                        'var _a,_virtual_index=null===(_a=null===state||void 0===state?void 0:state.recentPosts)||void 0===_a?void 0:_a.tutorial;return _virtual_index',
                    },
                    code: {
                      bindings: {
                        'component.options.posts':
                          'state?.recentPosts?.tutorial',
                      },
                    },
                    id: 'builder-35e881e0d9f946d2a196f231d7dbab5f',
                    component: {
                      name: 'RecentPostsList',
                      options: {
                        title: 'Recent Tutorials',
                      },
                    },
                    responsiveStyles: {
                      large: {
                        marginTop: '20px',
                      },
                    },
                  },
                  {
                    '@type': '@builder.io/sdk:Element',
                    '@version': 2,
                    bindings: {
                      'component.options.posts':
                        'var _a,_virtual_index=null===(_a=null===state||void 0===state?void 0:state.recentPosts)||void 0===_a?void 0:_a.podcast;return _virtual_index',
                    },
                    code: {
                      bindings: {
                        'component.options.posts':
                          'state?.recentPosts?.podcast',
                      },
                    },
                    id: 'builder-37a724468348463286d4e10a670b606c',
                    component: {
                      name: 'RecentPostsList',
                      options: {
                        title: 'Recent Podcasts',
                      },
                    },
                    responsiveStyles: {
                      large: {
                        marginTop: '20px',
                      },
                    },
                  },
                  {
                    '@type': '@builder.io/sdk:Element',
                    '@version': 2,
                    bindings: {
                      'component.options.posts':
                        'var _a,_virtual_index=null===(_a=null===state||void 0===state?void 0:state.recentPosts)||void 0===_a?void 0:_a.post;return _virtual_index',
                    },
                    code: {
                      bindings: {
                        'component.options.posts': 'state?.recentPosts?.post',
                      },
                    },
                    id: 'builder-fb35c9af399348b590843f036b2c5d39',
                    component: {
                      name: 'RecentPostsList',
                      options: {
                        title: 'Recent Blog',
                      },
                    },
                    responsiveStyles: {
                      large: {
                        marginTop: '20px',
                      },
                    },
                  },
                ],
              },
            ],
          },
        ],
        responsiveStyles: {
          large: {
            marginLeft: '20px',
            marginRight: '20px',
          },
        },
      },
    ],
  },
];
