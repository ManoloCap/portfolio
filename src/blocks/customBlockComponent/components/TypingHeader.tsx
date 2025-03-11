import React from 'react';
import TypingAnimation from '@/components/TypingAnimation';
import { geologica } from '@/app/fonts';

export const TypingHeaderProjects: React.FC = () => {
  const messages = [
    "Slide over the projects...",
    "... that shaped my journey.",
    "I am, Manolo Capilla.",
    "Software Developer.",
    "Mechatronic Engineer.",
  ]

    return <TypingHeader messages={messages} /> ;
};

export const TypingHeaderHome: React.FC = () => {
  const messages = [
    "I am, Manolo Capilla.",
    "Software Developer.",
    "Mechatronic Engineer."
    ]
  
    return <TypingHeader messages={messages} /> ;
};


interface TypingHeaderProps {
  messages: string[]
}
export const TypingHeader: React.FC<TypingHeaderProps> = ( props ) => {
    const { messages } = props;
    return (
      <div className="flex justify-end text-5xl mx-[5%] min-h-[18vh] xl:min-h-[10vh] 2xl:text-8xl 2xl:min-h-[13rem] 2xl:mt-8">
        <div>
          <TypingAnimation
            key={1}
            messages={messages}
            typingSpeed={110} // 0.2 seconds per character
            mistakesPerMessage={10}
          />
        </div>
      </div>
    );
};
