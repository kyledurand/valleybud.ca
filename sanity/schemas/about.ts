export default {
  name: 'about',
  type: 'document',
  title: 'About',
  fields: [
    {
      name: 'image',
      type: 'image',
      title: 'Image',
    },
    {
      title: 'Content',
      name: 'content',
      type: 'array',
      of: [{type: 'block'}],
    },
  ],
}
