import {CogIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

/**
 * Project document schema for CCI Lab projects
 */

export const project = defineType({
  name: 'project',
  title: 'Projects',
  icon: CogIcon,
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
      name: 'description',
      title: 'Description',
      type: 'blockContent',
      description: 'Brief project description',
    }),
    defineField({
      name: 'bodyText',
      title: 'Detailed Content',
      type: 'blockContent',
      description: 'Full project details and information',
    }),
    defineField({
      name: 'url',
      title: 'Project URL',
      type: 'url',
      description: 'Project website or demo link',
    }),
    defineField({
      name: 'authors',
      title: 'Team Members',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'person'}],
        },
      ],
      description: 'Project team members and contributors',
    }),
    defineField({
      name: 'publicationDate',
      title: 'Project Date',
      type: 'date',
      validation: (rule) => rule.required(),
      description: 'Project start date or publication date',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Active', value: 'active'},
          {title: 'Completed', value: 'completed'},
          {title: 'Upcoming', value: 'upcoming'},
        ],
      },
      initialValue: 'active',
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
      status: 'status',
      thumbnail: 'thumbnail',
    },
    prepare(selection) {
      const {authors, status} = selection
      const authorNames = authors
        ?.slice(0, 2)
        .map((author: any) => author.name)
        .join(', ')
      const hasMoreAuthors = authors?.length > 2

      let subtitle = ''
      if (authorNames) {
        subtitle += `by ${authorNames}${hasMoreAuthors ? ' et al.' : ''}`
      }
      if (status) {
        subtitle += ` • ${status.charAt(0).toUpperCase() + status.slice(1)}`
      }

      return {
        title: selection.title,
        subtitle: subtitle || 'Project',
        media: selection.thumbnail,
      }
    },
  },
})
