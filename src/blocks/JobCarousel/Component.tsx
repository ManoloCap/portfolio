'use client'

import React from 'react';
import { Media } from '@/payload-types';
import RichText from '@/components/RichText';
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';

type Props = 
  {
    id?: string;
  } & JobCarouselType 

export type JobCarouselType = {
  blockName?: string;
  blockType?: 'jobCarousel';
  content: SerializedEditorState;
}

export const JobCarousel: React.FC<Props> = (props) => {
  const {
    content,
  } = props;

  return (
    <div className="container" style={{backgroundColor: 'red'}}>
      Job Carousel Component 
    </div>
  );
};