export default {
  name: 'privacy',
  type: 'document',
  title: 'Privacy policy',
  fields: [
    {
      title: 'Content',
      name: 'content',
      type: 'array',
      of: [{type: 'block'}],
    },
  ],
}
