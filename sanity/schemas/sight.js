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
    ],
    preview: {
      select: {
        title: 'name',
      },
    },
  }
