export default {
    name: 'line',
    title: 'Line',
    type: 'document',
    fields: [
        {
            name: 'number',
            title: 'Number',
            type: 'number',
        },
        {
            name: 'directions',
            title: 'Directions',
            type: 'array',
            of: [{type: 'string'}],
        },
        {
            name: 'color',
            title: 'Color',
            type: 'string',
        },
        {
            name: 'stops',
            title: 'Stops',
            type: 'array',
            of: [{type: 'reference', to: {type: 'stop'}}],
        },
        {
            name: 'sights',
            title: 'Sights',
            type: 'array',
            of: [{type: 'object', fields: [
                {name: 'sight', type: 'reference', to: {type: 'stop'}, title: 'Sights'},
                {name: 'direction', type: 'number', title: 'Direction'},
            ]}],
        },
    ],
    preview: {
        select: {
          title: 'number',
        },
      },
  }
