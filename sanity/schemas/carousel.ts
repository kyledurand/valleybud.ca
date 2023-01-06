export default {
  name: 'carousel',
  type: 'document',
  title: 'Carousel',
  fields: [
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
      name: 'background',
      type: 'string',
      title: 'Background color',
      placeholder: '#000000',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image',
    },
  ],
}
