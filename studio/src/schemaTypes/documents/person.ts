import {UserIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

/**
 * Person schema for CCI Lab team members
 */

export const person = defineType({
  name: 'person',
  title: 'People',
  icon: UserIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      description: 'e.g., Research Director, PhD Candidate, Professor',
    }),
    defineField({
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
          validation: (rule) => {
            // Custom validation to ensure alt text is provided if the image is present. https://www.sanity.io/docs/validation
            return rule.custom((alt, context) => {
              if ((context.document?.image as any)?.asset?._ref && !alt) {
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
      name: 'bio',
      title: 'Biography',
      type: 'blockContent',
      description: 'Rich text biography of the person',
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn Profile',
      type: 'url',
      description: 'LinkedIn profile URL',
    }),
    defineField({
      name: 'uvaLink',
      title: 'UvA Profile',
      type: 'url',
      description: 'University of Amsterdam profile URL',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  // List preview configuration. https://www.sanity.io/docs/previews-list-views
  preview: {
    select: {
      name: 'name',
      role: 'role',
      image: 'image',
    },
    prepare(selection) {
      return {
        title: selection.name,
        subtitle: selection.role || 'Team Member',
        media: selection.image,
      }
    },
  },
})
