export default {
  name: 'returns',
  type: 'document',
  title: 'Return policy',
  fields: [
    {
      title: 'Content',
      name: 'content',
      type: 'array',
      of: [{type: 'block'}],
    },
  ],
}
