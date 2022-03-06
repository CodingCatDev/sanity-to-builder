import { CoverPhoto } from '../../models/builder';

export async function sleep(millis: number) {
  return new Promise((resolve) => setTimeout(resolve, millis));
}

export const getCover = ({
  youtube,
  coverPhoto,
}: {
  youtube: string;
  coverPhoto: CoverPhoto;
}) =>
  youtube
    ? {
        '@type': '@builder.io/sdk:Element',
        '@version': 2,
        id: 'builder-d6c0b6a08fdc4c67bdd434b898ddaaff',
        component: {
          name: 'Embed',
          options: {
            content:
              '<div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;"><iframe src="https://www.youtube.com/embed/' +
              youtube.split('/').pop() +
              '?rel=0" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen scrolling="no" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"></iframe></div>',
            url: youtube,
          },
        },
        responsiveStyles: {
          large: {
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            flexShrink: '0',
            boxSizing: 'border-box',
          },
        },
      }
    : {
        '@type': '@builder.io/sdk:Element',
        '@version': 2,
        id: 'builder-57115baa51984c1581328a083e70c6f7',
        component: {
          name: 'NextImage',
          options: {
            src: coverPhoto.public_id,
            layout: 'responsive',
            width: 1920,
            height: 1080,
            alt: 'An image description',
            className: '',
          },
        },
        responsiveStyles: {
          large: {
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            flexShrink: '0',
            boxSizing: 'border-box',
          },
        },
      };
