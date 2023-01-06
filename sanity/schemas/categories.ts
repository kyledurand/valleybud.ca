export default {
  name: 'categories',
  type: 'document',
  title: 'Categories',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'imageAlt',
      type: 'string',
      title: 'Image alt',
    },
    {
      name: 'link',
      type: 'string',
      title: 'Link',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image',
    },
  ],
}
