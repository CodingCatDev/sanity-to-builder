import { convertDataFromSanityToBuilder, PostType } from './convert';
import { archiveAllModelData } from './models';

(async () => {
  await archiveAllModelData([
    PostType.post.toString(),
    PostType.lesson.toString(),
    PostType.podcast.toString(),
    PostType.tutorial.toString(),
  ]);
  await convertDataFromSanityToBuilder({
    types: [
      PostType.post,
      PostType.lesson,
      PostType.podcast,
      PostType.tutorial,
    ],
  });
})();
