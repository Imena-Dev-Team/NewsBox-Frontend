import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'about',
  title: 'About',
  type: 'document',

  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),

    defineField({
        name: 'familyName',
        title: 'Family Name',
        type: 'string',
      }),
      defineField({
        name: 'role',
        title: 'Role',
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
        name: 'year',
        title: 'Year',
        type: 'string',
      }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  
  ],
})
