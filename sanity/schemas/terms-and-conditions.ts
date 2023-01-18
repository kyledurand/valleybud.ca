export default {
  name: 'terms',
  type: 'document',
  title: 'Terms and conditions',
  fields: [
    {
      title: 'Content',
      name: 'content',
      type: 'array',
      of: [{type: 'block'}],
    },
  ],
}
