import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'birthday',
  title: 'Birthday',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),

    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
]})