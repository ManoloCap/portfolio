import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface HomeMidComponentProps {
  
}
export const HomeMidComponent: React.FC<HomeMidComponentProps> = () => {
    const [isBlogImageHovered, setIsBlogImageHovered] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    return (
<div className="flex flex-col md:flex-row h-[50vh] my-10 px-8">
  {/* First Image Section */}
  <div className="flex-1 flex items-center justify-center border-b md:border-b-0 relative">
    <Link href="/blog" className="relative w-full h-full flex justify-center items-center rounded-2xl bg-gray-800 cursor-pointer"
      onMouseEnter={() => setIsBlogImageHovered(true)}
      onMouseLeave={() => setIsBlogImageHovered(false)}
      >
      {/* Clickable area */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${isBlogImageHovered ? 'opacity-10' : 'opacity-100'}`}>
        <div className="relative w-full h-full">
          <Image
            src="/images/profile_image.png" // Make sure this path is correct
            alt="Manolocap Profile Picture"
            fill // Use `fill` to occupy the entire space
            sizes="(max-width: 768px) 80vw, 50vw" // Define sizes
            style={{ objectFit: 'cover' }} // Maintain aspect ratio visually
            className="rounded-2xl border-4 border-white dark:border-black"
          />
        </div>
      </div>

      {/* Mobile First*/}
      <div className={`flex absolute inset-0 items-center justify-center transition-opacity duration-500 md:hidden`}>
        <h2 className="text-black text-2xl sm:text-4xl font-bold">
          <span>{`Blog 🚧`}</span>
        </h2>
      </div>

      <div className={`hidden md:flex  absolute inset-0 items-center justify-center transition-opacity duration-500 ${isBlogImageHovered ? 'opacity-100' : 'opacity-0'}`}>
        <h2 className="text-black text-2xl md:text-4xl font-bold">
          <span>{`Blog 🚧`}</span>
        </h2>
      </div>
    </Link>
  </div>

  {/* Second Image Section */}
  <div className="flex-1 flex items-center justify-center border-b md:border-b-0 relative">
    <Link href="/projects" className="relative w-full h-full flex justify-center items-center rounded-2xl bg-white cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
      {/* Clickable area */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
        <div className="relative w-full h-full">
          <Image
            src="/images/home_books.png" // Make sure this path is correct
            alt="Books Image"
            fill // Use `fill` to occupy the entire space
            sizes="(max-width: 768px) 80vw, 50vw" // Define sizes
            style={{ objectFit: 'cover' }} // Maintain aspect ratio visually
            className="rounded-2xl border-4 border-white dark:border-black"
          />
        </div>
      </div>
      <div className={`absolute inset-0 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <div className="relative w-full h-full">
          <Image
            src="/images/home_books_hover.png" // Make sure this path is correct
            alt="Books Hover Image"
            fill // Use `fill` to occupy the entire space
            sizes="(max-width: 768px) 80vw, 50vw" // Define sizes
            style={{ objectFit: 'cover' }} // Maintain aspect ratio visually
            className="rounded-2xl border-4 border-white dark:border-black"
          />
        </div>
      </div>

      {/* Mobile First*/}
      <div className={`flex absolute inset-0 items-center justify-center transition-opacity duration-500  md:hidden`}>
        <h2 className="text-black text-2xl sm:text-4xl font-bold">
          <span>{`Projects`}</span>
        </h2>
      </div>

                    <div className={`flex absolute inset-0 items-center justify-center transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <h2 className="text-black text-2xl sm:text-4xl font-bold">
          <span>{`Projects`}</span>
        </h2>
      </div>
    </Link>
  </div>
</div>
    );
};