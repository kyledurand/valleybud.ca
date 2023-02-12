export default {
  name: 'specials',
  type: 'document',
  title: 'Specials',
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
      name: 'details',
      type: 'string',
      title: 'Details',
    },
    {
      name: 'promo',
      type: 'string',
      title: 'Promo',
    },
    {
      name: 'accentColor',
      type: 'string',
      title: 'Accent color',
      placeholder: '#000000',
    },
    {
      name: 'action',
      type: 'string',
      title: 'Action',
    },
    {
      name: 'priority',
      type: 'number',
      title: 'Priority',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image',
    },
  ],
}
