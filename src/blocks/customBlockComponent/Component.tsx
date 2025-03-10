'use client'

import React from 'react';
import { TypingHeaderHome, TypingHeaderProjects } from '@/blocks/customBlockComponent/components/TypingHeader'
import { geologica } from '@/app/fonts'
type Props = 
  {
    id?: string;
  } & JobCarouselType 

export type JobCarouselType = {
  blockName?: string;
  blockType?: 'jobCarousel';
  cb_comp?: string
}

export const customBlockComponent: React.FC<Props> = (props) => {
  const {
    cb_comp
  } = props;

  const componentMapping: { [key: string]: React.FC<any> } = {
    manolocap_type_header_projects: () => <TypingHeaderProjects/>,
    manolocap_type_header_home: () => <TypingHeaderHome/>,
  };

  const ComponentToRender = cb_comp ? componentMapping[cb_comp] : null;

  return (
    <div className={geologica.className}> 
    {ComponentToRender ? <ComponentToRender /> : <div>Unknown component: {cb_comp}</div>}
        
    </div>
  );
};