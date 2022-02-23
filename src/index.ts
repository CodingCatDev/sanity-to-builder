import { convertDataFromSanityToBuilder, PostType } from './convert';
import { archiveAllModelData } from './models';

(async () => {
  await archiveAllModelData(['podcast']);
  await convertDataFromSanityToBuilder({ types: [PostType.podcast] });
})();
