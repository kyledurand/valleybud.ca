export default {
  name: 'carousel',
  type: 'document',
  title: 'Carousel',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'titleColor',
      type: 'string',
      title: 'Title color',
      placeholder: '#000000',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image',
    },
    {
      name: 'imageAlt',
      type: 'string',
      title: 'Image alt',
    },
    {
      name: 'bgColor',
      type: 'string',
      title: 'Background color',
      placeholder: '#000000',
    },
  ],
}
