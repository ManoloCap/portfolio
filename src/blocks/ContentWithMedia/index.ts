import {Block} from 'payload'

export const ContentWithMedia: Block = {
    slug: 'contentWithMedia',
    labels: {
        singular: "Content with Media Block",
        plural: "Content with Media Blocks",
    },
    fields: [

        {
            type: 'richText',
            name: 'content'
        },
        {
            type: 'upload',
            name: 'image',
            relationTo:'media'
        },
        {
            type: 'radio',
            name: 'textPosition',
            options: [ "Left", "Right" ]
        }
    ]
}
