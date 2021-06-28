export default {
    name: 'appInfo',
    title: 'App Info',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
        name: 'appInfo',
        title: 'App Info',
        type: 'array',
        of: [{type: 'block'}],
        },
    ],
}
