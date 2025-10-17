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
      validation: (Rule) => Rule.required(),
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
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'yearRange',
        title: 'Year Range',
        type: 'string',
        description: 'Academic year formatted as YYYY-YYYY (e.g., 2024-2025)',
        validation: (Rule) => Rule.required()
          .regex(/^\d{4}-\d{4}$/,{name: 'YYYY-YYYY'})
          .custom((value) => {
            if (!value) return true;
            const [start, end] = value.split('-').map((v) => parseInt(v, 10));
            if (!Number.isFinite(start) || !Number.isFinite(end)) return 'Invalid numbers';
            if (end !== start + 1) return 'End year must be start year + 1';
            if (start < 1900 || end > 3000) return 'Year out of range';
            return true;
          }),
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
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
    },
    prepare(selection) {
      const {title, subtitle, media} = selection
      return {
        title,
        subtitle,
        media,
      }
    }
  }
})
