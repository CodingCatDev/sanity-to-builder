import {
  getBuilderAdmin,
  getSanityClient,
  getBuilderClient,
  deleteBuilder,
  postBuilder,
  getAllBuilder,
  putBuilder,
} from './config';
import groq from 'groq';
import { sleep } from './templates/general';
const builderAdmin = getBuilderAdmin();
const builderClient = getBuilderClient();
const sanity = getSanityClient();

export const pushAllModelData = async ({
  groqStatement,
}: {
  groqStatement: string;
}) => {
  const modelData = await sanity.fetch(groq`${groqStatement}`);

  for (const d of modelData) {
    console.log('Adding Model: ', d._type);
    const res = await postBuilder({
      model: d._type,
      body: {
        name: d._id,
        data: {
          ...d,
        },
      },
    });
    console.log(JSON.stringify(res));
  }
};

// export const deleteAllModelData = async (models: string[]) => {
//   for (const m of models) {
//     console.log('Finding Builder Models for: ', m);
//     const builderModels = await getAllBuilder({ model: m });
//     if (!builderModels?.results) {
//       console.log('No Items for model found.');
//       continue;
//     }
//     for (const bModel of builderModels.results) {
//       console.log('deleting: ', bModel.modelId, bModel.id);
//       const result = await deleteBuilder({
//         model: bModel.modelId,
//         id: bModel.id,
//       });
//       console.log('Result', JSON.stringify(result));
//     }
//   }
// };

export const archiveAllModelData = async (models: string[]) => {
  for (const m of models) {
    console.log('Finding Builder Models for: ', m);
    const builderModels = await getAllBuilder({
      model: m,
      includeUnpublished: false,
      published: 'published',
    });
    if (!builderModels?.results) {
      console.log('No Items for model found.');
      continue;
    } else {
      console.log('Found: ', builderModels.results.length);
    }
    for (const bModel of builderModels.results) {
      console.log('archiving: ', m, bModel.id);
      const result = await putBuilder({
        model: m,
        id: bModel.id,
        body: {
          published: 'archived',
        },
      });
      console.log('Result', JSON.stringify(result));
      await sleep(5000);
    }
  }
};

export const createGroqSelectAllTypes = (list: string[], include = true) => {
  let match = '';
  for (const [i, v] of list.entries()) {
    match += `_type match "${v}*" ${i != list.length - 1 ? ' || ' : ''}`;
  }
  return `*[${include ? '' : '!('}${match}${include ? '' : ')'}]`;
};

export const getAllTypes = async (list: string[], include = true) => {
  const groqSelect = createGroqSelectAllTypes(list, include);
  const models = await sanity.fetch(groq`${groqSelect}._type`);
  if (!models || Object.keys(models).length === 0) {
    return [];
  }
  return [...new Set(models)] as string[];
};

export const getSingleDocument = async (type: string) => {
  return await sanity.fetch(groq`*[_type == '${type}'][0]`);
};

export const isObject = (obj: any, k: any) => {
  return typeof obj[k] == 'object' && obj[k] !== null;
};

const getFields = (fieldsObject: object) => {
  const recursiveFields = (inbound: { [key: string]: any }) => {
    const innerFields: any[] = [];
    for (var k in inbound) {
      innerFields.push({
        simpleTextOnly: false,
        disallowRemove: false,
        showIf: '',
        copyOnAdd: true,
        name: k,
        mandatory: false,
        showTemplatePicker: true,
        hidden: false,
        subFields: isObject(inbound, k) ? recursiveFields(inbound[k]) : [],
        type: isObject(inbound, k) ? 'object' : 'text',
        helperText: '',
        hideFromFieldsEditor: false,
        noPhotoPicker: false,
        autoFocus: false,
        hideFromUI: false,
        broadcast: false,
        bubble: false,
        onChange: '',
        permissionsRequiredToEdit: '',
        advanced: false,
        model: '',
        required: false,
        '@type': '@builder.io/core:Field',
      });
    }
    return innerFields;
  };
  return recursiveFields(fieldsObject);
};

export const createModels = async (models: string[]) => {
  console.log('Creating models', JSON.stringify(models));

  let chain = [];
  for (const m of models) {
    //Get Each types fields
    const modelRef = await getSingleDocument(m);
    const fields = getFields(modelRef);
    chain.push(
      builderAdmin.chain.mutation
        .addModel({
          body: {
            defaultQuery: [],
            kind: 'data',
            showTargeting: true,
            allowHeatmap: true,
            id: m,
            showMetrics: true,
            publicReadable: true,
            name: m,
            useQueryParamTargetingClientSide: false,
            fields,
            helperText: `This model is ${m}`,
            allowBuiltInComponents: true,
            bigData: false,
            strictPrivateWrite: false,
            requiredTargets: [],
            schema: {},
            examplePageUrl: 'https://my.site.com/preview',
            webhooks: [],
            apiGenerated: true,
            showScheduling: true,
            showAbTests: true,
            pathPrefix: '/',
            componentsOnlyMode: false,
          },
        })
        .execute({ id: true })
    );
  }
  await Promise.all(chain);
};

export const getModels = async () => {
  const models = await builderAdmin.query({
    models: { id: true, name: true, kind: true, fields: true },
  });
  return models.data?.models;
};

export const modelCreate = async () => {
  // Get all types from Sanity
  const models: string[] = await getAllTypes(
    ['system', 'kv', 'sanity', 'workflow', 'pluginSecrets'],
    false
  );
  // Use those types to create Models in Builder
  // await createModels(models);

  //Delete all model data for each type
  // await deleteAllModelData(models);

  // Add new data from Sanity into Builder
  const groqSelect = createGroqSelectAllTypes(
    ['system', 'kv', 'sanity', 'workflow', 'pluginSecrets'],
    false
  );
  pushAllModelData({
    groqStatement: `${groqSelect}{
    ...,
  }
  `,
  });
};
