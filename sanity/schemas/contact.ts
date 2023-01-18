export default {
  name: 'contact',
  type: 'document',
  title: 'Contact',
  fields: [
    {
      title: 'Content',
      name: 'content',
      type: 'array',
      of: [{type: 'block'}],
    },
  ],
}
