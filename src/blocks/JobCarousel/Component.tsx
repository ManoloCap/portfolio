'use client'
import React, { useState, useRef, useEffect} from 'react';
import { Job } from '@/payload-types';
import { getProgrammingLanguageColor } from '@/utilities/techStackColorConfig';
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi
} from "@/components/ui/carousel";
import { Media } from '@/payload-types';

import { Badge } from "@/components/ui/badge";
import Image from 'next/image'; 

type Props = {
  id?: string;
} & JobCarouselType;

export type JobCarouselType = {
  blockName?: string;
  blockType?: 'jobCarousel';
  content: SerializedEditorState;
  job: Job[];
  title: string;
};

const empty_job: Job = {
  id: -1,
  title: "",
  company: "",
  start_time: "",
  end_time: "",
  tech_stack: [],
  images: [],
  updatedAt: "",
  createdAt: "",
  description: ""
};


function isMediaType(image: number | Media): image is Media {
  return typeof image === 'object' && image !== null && 'url' in image;
}


export const JobCarousel: React.FC<Props> = (props) => {
  const { content, job, title } = props;
  const [ activeJob, setActiveJob ] = useState<Job>(empty_job);
  
  const [carouselImagesApi, setCarouselImagesApi] = React.useState<CarouselApi>()
  const [imageLoaded, setImageLoaded] = React.useState(false);
  
  const [carouselJobsApi, setCarouselJobsApi] = React.useState<CarouselApi>()
  const [carouselJobsSecondaryApi, setCarouselJobsSecondaryApi] = React.useState<CarouselApi>()

  const logo_image = "https://cdn.theorg.com/52358455-c542-4ec0-b515-413eb97942fb_medium.jpg"

  if (!job || job.length === 0) {
    return null;
  }

  const formatDate = (dateString?: string): string => {
    if (!dateString) return "Unknown"; // Handle undefined dateString
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  
  const handleJobCardSelection = (e: React.MouseEvent<HTMLDivElement>, jobItem: Job, index: number) => {

    // First, set the active job to the selected job item
    setActiveJob(jobItem);
  
    // Check if the carousel image API is available
    if (carouselImagesApi) {
      // Scroll to the beginning of the carousel
      carouselImagesApi.scrollTo(0, true);
    } else {
      console.warn("carouselImagesApi is not set");
    }
  
    console.log("CLICKED: ", jobItem);
    console.log("Scrolling to index: ", index);
  
    // Check if the carousel jobs secondary API is available
    if (carouselJobsSecondaryApi) {
      // Scroll to the specific job index in the secondary carousel
      carouselJobsSecondaryApi.scrollTo(index, true);
    } else {
      console.warn("carouselJobsSecondaryApi is not set");
    }
  };


const handleJobCardSelectionOpened = () => {
  carouselImagesApi?.scrollTo(0, true);
  setActiveJob(empty_job);
};

  return (
    <div className="gap-8 flex flex-col items-center justify-center flex-grow ">

      {activeJob?.id == -1 && ( 
        <div className="flex flex-col items-center justify-center w-full h-full mb-10">
          <h1 className="text-2xl bold font-semibold  text-white mt-8  decoration-wavy">
            Professional Experience
          </h1>
      
          <div className="mx-16 mt-4 relative">
          <Image
            src="/images/slide_real_hand.gif"
            alt="Overlay Image"
            layout="intrinsic"
            width={550}
            height={550}
            className="absolute z-10 pointer-events-none animate-fadeInOut"
            style={{
                top: 'auto',
                right: '0px',
                bottom: '0px',
                left: 'auto',
              }}
            />
            <Carousel
              opts={{
                align: "start",
              }}
              className=""
              setApi={setCarouselJobsApi}
            >
              <CarouselContent>
                {job.map((jobItem, index) =>  {
                  // Update the fullImageUrl to point to the relative path
                  const carousel_card_Logo_image = jobItem?.logo_image && isMediaType(jobItem.logo_image)
                  ? `${jobItem.logo_image.url}` // Assuming images are in 'public/images'
                  : '/default-image.jpg'; // Provide a fallback URL within 'public'            
                  return (
                    <CarouselItem key={jobItem.id} className="sm:basis-1/1 md:basis-1/2 xl:basis-1/3 2xl:basis-1/4 " onClick={ (e) => {handleJobCardSelection(e,jobItem, index)}}>

                      <Card className="transition ease-in-out duration-300 hover:bg-purple-300 active:bg-yellow-300 hover:cursor-pointer" >
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <div className="container p-0 w-full h-full bg-black rounded">
                            <div className="grid grid-cols-1 gap-0 w-full h-full bg-purple-500 rounded">
                              
                              <div className="flex flex-co justify-between">
                                <div className="p-4">
                                  <h1 className="font-bold text-xl text-green-300 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)] ">{jobItem?.company}</h1>
                                  <h2  className="font-bold text-xl text-black">{jobItem?.title}</h2>
                                  <p className="italic text-sm mt-1 text-gray-300 ">
                                    {`${formatDate(jobItem?.start_time ?? '')} - ${formatDate(jobItem?.end_time ?? '')}`}
                                  </p> 
                                </div>
                                <div className="p-2 rounded-xl">
                                  <Image
                                      src={carousel_card_Logo_image}
                                      alt={`Company Logo`}
                                      layout="intrinsic"
                                      width={89}
                                      height={89}
                                      className="object-cover rounded-lg"
                                    />
                                </div>

                              </div>




                              <div className="bg-gray-900 p-4">
                                <h2 className="text-center mb-4">Tech Stack</h2>
                                  {Array.isArray(jobItem?.tech_stack) && (
                                    <div className="flex flex-wrap gap-2">
                                      {jobItem.tech_stack.map((tech, index) => (
                                        <Badge
                                          key={index}
                                          className={`m-1 ${getProgrammingLanguageColor(tech)}`}
                                        >
                                          {tech}
                                        </Badge>
                                      ))}
                                    </div>
                                  )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  )
                })}

              </CarouselContent>

              <div className="hidden md:block">
                <CarouselPrevious />
              </div>
              <div className="hidden md:block">
                <CarouselNext />
              </div>

            </Carousel>
          </div>
        </div>
      )}

      {activeJob?.id != -1 && ( 


        <Card
          className="min-w-[100vw] transition ease-in-out duration-300 hover:bg-purple-300 active:bg-yellow-300 hover:cursor-pointer bg-purple-500 p-4"
          onClick={() => handleJobCardSelectionOpened()}
        >
          <CardContent className="flex items-center justify-center">
            <h2 className="font-bold text-xl text-center">{activeJob?.company}</h2>
          </CardContent>
        </Card>

      )}

      {activeJob?.id != -1 && ( 
        <div className="flex flex-col md:flex-row r px-14 gap-x-8 items-center mb-10">
          <div className="flex flex-col items-center md:w-1/2 gap-y-8 md:gap-y-16 p-4">
            <h1 className="text-3xl text-center font-bold dark:text-white decoration-wavy">
              {activeJob?.title}
            </h1>
            <div className="flex-1 flex items-center justify-center ">
              <p className="dark:text-white text-justify md:text-xl 2xl:text-2xl">
                {activeJob?.description}
              </p>
            </div>
          </div>

          <div className="md:mt-0 md:w-1/2 flex justify-center">
            <Carousel
              opts={{
                align: "start",
              }}
              className=""
              setApi={setCarouselImagesApi}
            >
              <CarouselContent className="items-center">
                {activeJob?.images?.map((imageData, index) => {
                  // Update the fullImageUrl to point to the relative path
                  const fullImageUrl = imageData?.image && isMediaType(imageData.image)
                    ? `${imageData.image.url}` // Assuming images are in 'public/images'
                    : '/default-image.jpg'; // Provide a fallback URL within 'public'
                  console.log("IMAGE URL; ", fullImageUrl)
                  return (
                    <CarouselItem key={index} className="flex justify-center">
                      <Card className="">
                        <CardContent className="p-5 bg-gray-900">
                          <Image
                            src={fullImageUrl}
                            alt={`Job Image ${index + 1}`}
                            layout="intrinsic"
                            width={1024}
                            height={1024}
                            className="object-cover rounded-lg"
                          />
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      )}

    </div>
  );
};