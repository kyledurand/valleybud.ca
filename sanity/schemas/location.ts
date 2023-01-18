export default {
  name: 'location',
  type: 'document',
  title: 'Location',
  fields: [
    {
      title: 'Location',
      name: 'content',
      type: 'array',
      of: [{type: 'block'}],
    },
  ],
}
