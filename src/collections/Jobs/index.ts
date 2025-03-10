import type { CollectionConfig } from 'payload'
import { tech_stack } from '@/utilities/webConstants'

export const Jobs: CollectionConfig = {
  slug: 'jobs',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      label: "Title",
      type: 'text',
    },
    {
      name: 'company',
      label: 'Company',
      type: 'text',
    },
    {
      name: 'start_time',
      label: 'Start Time',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'd MMM yyy',
        },
      },
    },
    {
      name: 'end_time',
      label: 'End Time',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'd MMM yyy',
        },
      },
    },
    {
      name: "description",
      label: "Description",
      type: 'textarea',
      required: true
    },
    {
      name: "tech_stack",
      label: "Job Tech Stack",
      type: "select",
      hasMany: true,
      options: tech_stack
    },
    {
      name: "images",
      type: "array",
      fields: [
        {
          name: 'image',
          label: "Image",
          type: 'upload',
          relationTo:'media'
      },
      ]
    }
  ],
  timestamps: true,
}