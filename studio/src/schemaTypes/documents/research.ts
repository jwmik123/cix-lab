import {DocumentTextIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

/**
 * Research document schema for CCI Lab research projects
 */

export const research = defineType({
  name: 'research',
  title: 'Research',
  icon: DocumentTextIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
          validation: (rule) => {
            return rule.custom((alt, context) => {
              if ((context.document?.thumbnail as any)?.asset?._ref && !alt) {
                return 'Required'
              }
              return true
            })
          },
        }),
      ],
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: 'alt',
        },
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      description: 'Brief description of the research',
      rows: 3,
    }),
    defineField({
      name: 'bodyText',
      title: 'Body Content',
      type: 'blockContent',
      description: 'Full rich text content of the research',
    }),
    defineField({
      name: 'url',
      title: 'External URL',
      type: 'url',
      description: 'External project or research link if applicable',
    }),
    defineField({
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'person'}],
        },
      ],
      description: 'Research authors/contributors',
    }),
    defineField({
      name: 'publicationDate',
      title: 'Publication Date',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Cultural Economics', value: 'cultural-economics'},
          {title: 'Digital Media', value: 'digital-media'},
          {title: 'Creative Industries', value: 'creative-industries'},
          {title: 'Innovation', value: 'innovation'},
          {title: 'Entrepreneurship', value: 'entrepreneurship'},
          {title: 'Business Models', value: 'business-models'},
          {title: 'Technology', value: 'technology'},
          {title: 'Policy', value: 'policy'},
        ],
      },
      description: 'Research categories for filtering',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Display on homepage',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      authors: 'authors',
      thumbnail: 'thumbnail',
      categories: 'categories',
    },
    prepare(selection) {
      const {authors} = selection
      const authorNames = authors
        ?.slice(0, 2)
        .map((author: any) => author.name)
        .join(', ')
      const hasMoreAuthors = authors?.length > 2

      return {
        title: selection.title,
        subtitle: authorNames ? `by ${authorNames}${hasMoreAuthors ? ' et al.' : ''}` : 'Research',
        media: selection.thumbnail,
      }
    },
  },
})
