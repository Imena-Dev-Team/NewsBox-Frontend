import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'testimonials',
  title: 'Testimonials',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  

    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),

    defineField({
      name: 'dateWritten',
      title: 'Date Written',
      type: 'date',
      description: 'The date when this testimonial was written (will display as MM-YYYY badge)',
      validation: (Rule) => Rule.required(),
    }),

  ],
})
