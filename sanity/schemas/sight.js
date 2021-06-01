export default {
    name: 'sight',
    title: 'Sight',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'name',
          maxLength: 96,
        },
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
      },
      {
        name: 'picture',
        title: 'Picture',
        type: 'image',
      },
      {
        name: 'coordinates',
        title: 'Coordinates',
        type: 'object',
        fields: [
          {name: 'lat', type: 'string', title: 'Latitude'},
          {name: 'lon', type: 'string', title: 'Longitude'},
        ],
      },
      {
        name: 'closestStop',
        title: 'Closest Stop',
        type: 'reference',
        to: {type: 'stop'},
      },
    ],
    preview: {
      select: {
        title: 'name',
      },
    },
  }
