export default {
  name: 'about',
  type: 'document',
  title: 'About',
  fields: [
    {
      title: 'Content',
      name: 'content',
      type: 'array',
      of: [{type: 'block'}],
    },
  ],
}
