import { getBuilderClient, getSanityClient } from './config';
import groq from 'groq';
const builder = getBuilderClient();
const sanity = getSanityClient();

export const getAllTypes = async (list: string[], include = true) => {
  let match = '';
  for (const [i, v] of list.entries()) {
    match += `_type match "${v}*" ${i != list.length - 1 ? ' || ' : ''}`;
  }
  return [...new Set(await sanity.fetch(groq`*[${include ? '' : '!('}${match}${include ? '' : ')'}]._type`))];
};

export const createModels = async () => {
    // Get all types from Sanity
    const unique = await getAllTypes(
        ['system', 'kv', 'sanity', 'workflow', 'pluginSecrets'],
        false
    );
    console.log('Creating models', JSON.stringify(unique));
    if (!unique || Object.keys(unique).length === 0) {
        return;
    }

    let chain = [];
    for (const u of unique) {
        chain.push(builder.chain.mutation.addModel({
            body: {
                defaultQuery: [],
                kind: 'data',
                showTargeting: true,
                allowHeatmap: true,
                id: u,
                showMetrics: true,
                publicReadable: true,
                name: u,
                useQueryParamTargetingClientSide: false,
                fields: [
                    {
                        type: 'text',
                        '@type': '@builder.io/core:Field',
                        required: true,
                        hideFromFieldsEditor: true,
                        name: 'test',
                        showTemplatePicker: true,
                    },
                ],
                helperText: `This model is ${u}`,
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
        }).execute({ id: true })
        );
    }
    await Promise.all(chain);
}

export const getModels = async () => {
    const models = await builder.query({ models: { id: true, name: true, kind: true } });
    return models.data?.models;
}


(async () => {
    console.log('Before', await getModels())
    await createModels()
    console.log('After', await getModels())
})();
