import {BookIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

/**
 * Publication document schema for CCI Lab academic publications
 */

export const publication = defineType({
  name: 'publication',
  title: 'Publications',
  icon: BookIcon,
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
      title: 'Cover Image',
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
      description: 'Optional cover image for the publication',
    }),
    defineField({
      name: 'abstract',
      title: 'Abstract',
      type: 'blockContent',
      description: 'Publication abstract/summary',
    }),
    defineField({
      name: 'bodyText',
      title: 'Full Content',
      type: 'blockContent',
      description: 'Full content if available (optional)',
    }),
    defineField({
      name: 'url',
      title: 'Publication URL',
      type: 'url',
      description: 'Link to published paper or external source',
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
      description: 'Publication authors',
    }),
    defineField({
      name: 'publicationDate',
      title: 'Publication Date',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publicationYear',
      title: 'Publication Year',
      type: 'number',
      description: 'Automatically extracted from publication date',
      readOnly: true,
      initialValue: (doc: any) => {
        if (doc.publicationDate) {
          return new Date(doc.publicationDate).getFullYear()
        }
        return new Date().getFullYear()
      },
    }),
    defineField({
      name: 'journal',
      title: 'Journal/Publication Venue',
      type: 'string',
      description: 'Name of the journal, conference, or publication venue',
    }),
    defineField({
      name: 'doi',
      title: 'DOI',
      type: 'string',
      description: 'Digital Object Identifier',
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
      journal: 'journal',
      publicationYear: 'publicationYear',
      thumbnail: 'thumbnail',
    },
    prepare(selection) {
      const {authors, journal, publicationYear} = selection
      const authorNames = authors
        ?.slice(0, 2)
        .map((author: any) => author.name)
        .join(', ')
      const hasMoreAuthors = authors?.length > 2

      let subtitle = ''
      if (authorNames) {
        subtitle += `by ${authorNames}${hasMoreAuthors ? ' et al.' : ''}`
      }
      if (journal && publicationYear) {
        subtitle += ` • ${journal} (${publicationYear})`
      } else if (journal) {
        subtitle += ` • ${journal}`
      } else if (publicationYear) {
        subtitle += ` • ${publicationYear}`
      }

      return {
        title: selection.title,
        subtitle: subtitle || 'Publication',
        media: selection.thumbnail,
      }
    },
  },
})
