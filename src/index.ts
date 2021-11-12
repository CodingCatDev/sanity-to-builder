import { getBuilderAdmin, getSanityClient, getBuilderClient } from './config';
import groq from 'groq';
const builderAdmin = getBuilderAdmin();
const builderClient = getBuilderClient();
const sanity = getSanityClient();

export const getAllTypes = async (list: string[], include = true) => {
  let match = '';
  for (const [i, v] of list.entries()) {
    match += `_type match "${v}*" ${i != list.length - 1 ? ' || ' : ''}`;
  }
  const models = await sanity.fetch(
    groq`*[${include ? '' : '!('}${match}${include ? '' : ')'}]._type`
  );
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
    console.log(JSON.stringify(fields));
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

(async () => {
  // // Get all types from Sanity
  // const models: string[] = await getAllTypes(
  //   ['system', 'kv', 'sanity', 'workflow', 'pluginSecrets'],
  //   false
  // );

  // await createModels(models);
  const res = await builderClient
    .get('author', {
      options: {
        noTargeting: true,
        noCache: true,
        preview: true,
        cachebust: true,
      },
      preview: true,
      cachebust: true,
    })
    .toPromise();
  console.log(res);
})();
