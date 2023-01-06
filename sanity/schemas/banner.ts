export default {
  name: 'banner',
  type: 'document',
  title: 'Banner',
  fields: [
    {
      name: 'background',
      type: 'string',
      title: 'Background',
      placeholder: '#000000',
    },
    {
      name: 'color',
      type: 'string',
      title: 'Color',
      placeholder: '#000000',
    },
    {
      title: 'Content',
      name: 'content',
      type: 'array',
      of: [{type: 'block'}],
    },
  ],
}
