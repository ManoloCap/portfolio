import type { CollectionConfig } from 'payload'
import { tech_stack } from '@/utilities/webConstants'

export const Jobs: CollectionConfig = {
  slug: 'jobs',
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
      name: "exclude_seat",
      label: "Exclude Seats",
      type: "select",
      hasMany: true,
      options: tech_stack
    }
  ],
  timestamps: true,
}