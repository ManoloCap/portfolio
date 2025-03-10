import {Block} from 'payload'
import {Jobs} from '@/collections/Jobs/'

export const JobCarousel: Block = {
    slug: 'jobCarousel',
    labels: {
        singular: "Job Carousel Block",
        plural: "Job Carousel Blocks",
    },
    fields: [
        {
            name: 'title',
            label: 'Set a Title for the Carousel',
            type: 'text',
            required: true
        },
        {
            name: 'job',
            type: 'relationship',
            relationTo: 'jobs',
            hasMany: true,
            required: true,
            maxDepth: 10
        },
        {
            type: 'richText',
            name: 'content'
        }
    ]
}


