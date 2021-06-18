export default {
    name: 'line',
    title: 'Line',
    type: 'document',
    fields: [
        {
            name: 'number',
            title: 'Number',
            type: 'string',
        },
        {
            name: 'directions',
            title: 'Directions',
            type: 'array',
            of: [{type: 'string'}],
        },
        {
            name: 'sights',
            title: 'Sights',
            type: 'array',
            of: [{type: 'reference', to: {type: 'sight'}}],
        },
        {
            name: 'stops',
            title: 'Stops',
            type: 'array',
            of: [{type: 'reference', to: {type: 'stop'}}],
        },
        {
            name: 'color',
            title: 'Color',
            type: 'string',
        },
    ],
    preview: {
        select: {
          title: 'number',
        },
      },
  }
