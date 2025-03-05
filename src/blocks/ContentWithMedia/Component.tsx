'use client'

import React from 'react';
import { Media } from '@/payload-types';
import RichText from '@/components/RichText';
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';

export type ContentWithMediaType = {
  blockName?: string;
  blockType?: 'contentWithMedia';
  content: SerializedEditorState;
  image: Media | null;
  textPosition: 'Left' | 'Right';
}

export const ContentWithMedia: React.FC<
  {
    id?: string;
  } & ContentWithMediaType
> = (props) => {
  const {
    content,
    image,
    textPosition,
  } = props;

  return (
    <div className="container py-12">
      <div 
        className={`grid md:grid-cols-2 gap-8 items-center ${
          textPosition === 'Right' ? 'flex-row-reverse' : ''
        }`}
      >
        <div className="content">
          <RichText 
            data={content} 
            className="prose lg:prose-xl"
          />
        </div>
        <div className="media">
          {image && image.url && (
            <img
              src={image.url}
              alt={image.alt || ''}
              width={image.width || undefined}
              height={image.height || undefined}
              className="w-full h-auto rounded-lg object-cover"
            />
          )}
        </div>
      </div>
    </div>
  );
};