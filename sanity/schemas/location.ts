export default {
  name: 'location',
  type: 'document',
  title: 'Location',
  fields: [
    {
      name: 'image',
      type: 'image',
      title: 'Image',
    },
    {
      title: 'Location',
      name: 'content',
      type: 'array',
      of: [{type: 'block'}],
    },
  ],
}
