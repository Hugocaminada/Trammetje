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
    ],
    preview: {
        select: {
          title: 'number',
        },
      },
  }
