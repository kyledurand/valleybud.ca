export default {
  name: 'faq',
  type: 'document',
  title: 'FAQ',
  fields: [
    {
      title: 'Content',
      name: 'content',
      type: 'array',
      of: [{type: 'block'}],
    },
  ],
}
