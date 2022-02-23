import { convertDataFromSanityToBuilder, PostType } from './convert';
import { archiveAllModelData } from './models';

(async () => {
  await archiveAllModelData([PostType.lesson.toString()]);
  await convertDataFromSanityToBuilder({
    types: [PostType.lesson],
  });
})();
