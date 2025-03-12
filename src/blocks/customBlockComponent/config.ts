import {Block} from 'payload'

export const customBlockComponent: Block = {
    slug: 'customBlockComponent',
    labels: {
        singular: "Custom Block Component",
        plural: "Custom Block Componentss",
    },
    fields: [
        {
            name: 'cb_comp',
            label: 'Select the component to display',
            type: 'select',
            required: true,
            options: [
                {
                    label: 'Manolocap Type Header Projects',
                    value: 'manolocap_type_header_projects'
                },
                {
                    label: 'Manolocap Type Header Home',
                    value: 'manolocap_type_header_home',
                },
                {
                    label: 'Manolocap Home Middle Component',
                    value: 'manolocap_middle_home_component',
                }
            ]
        }
    ]
}


