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
import { Badge } from "@/components/ui/badge";

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

const empty_job = {
  id: -1,
  title: "",
  company: "",
  start_time: "",
  end_time: "",
  tech_stack: [],
  images: [],
  updatedAt: "",
  createdAt: "",
}
export const JobCarousel: React.FC<Props> = (props) => {
  const { content, job, title } = props;
  const [ activeJob, setActiveJob ] = useState<Job>(empty_job);
  
  const [carouselImagesApi, setCarouselImagesApi] = React.useState<CarouselApi>()
  const [imageLoaded, setImageLoaded] = React.useState(false);
  
  const [carouselJobsApi, setCarouselJobsApi] = React.useState<CarouselApi>()
  const [carouselJobsSecondaryApi, setCarouselJobsSecondaryApi] = React.useState<CarouselApi>()

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
    <div className="gap-8 flex flex-col items-center justify-center sm:px-20 xl:flex-grow xl:min-h-[60vh] xl:relative xl:top-[0vh] pb-5">

      {activeJob?.id == -1 && ( 
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl bold font-semibold  text-white mt-8 mb-4 decoration-wavy">
            Select one to get more details
          </h1>
      
          <Carousel
            opts={{
              align: "start",
            }}
            className="px-14"
            setApi={setCarouselJobsApi}
          >
            <CarouselContent>
              {job.map((jobItem, index) => (
                <CarouselItem key={jobItem.id} className="sm:basis-1/1 md:basis-1/2 xl:basis-1/3 2xl:basis-1/4" onClick={ (e) => {handleJobCardSelection(e,jobItem, index)}}>
                  <div className="p-1">

                  <Card className="transition ease-in-out duration-300 hover:bg-purple-300 active:bg-yellow-300 hover:cursor-pointer" >
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <div className="container p-0 w-full h-full bg-black">
                        <div className="grid grid-cols-1 gap-0 w-full h-full bg-purple-500 rounded">
                          <div className="p-4">
                            <div className="flex justify-between w-full">
                              <h2 className="font-bold text-xl">{jobItem?.company}</h2>
                              <h2 className="font-bold text-xl">{jobItem?.title}</h2>
                              {/* <pre className="text-white text-sm overflow-auto">
                                {JSON.stringify(jobItem, null, 2)}
                              </pre> */}
                            </div>
                            <p className="italic text-sm mt-1 text-gray-300">
                              {`${formatDate(jobItem?.start_time)} - ${formatDate(jobItem?.end_time)}`}
                            </p>
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

                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
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
        <div className="flex flex-col md:flex-row r px-14 gap-x-8">
          <div className="flex flex-col items-center md:w-1/2 gap-y-4 p-4">
            <h1 className="text-3xl text-center font-bold text-white decoration-wavy pt-4">
              {activeJob?.title}
            </h1>
            <div className="flex-1 flex items-center justify-center px-4 md:px-0">
              <p className="text-white text-justify">
                {activeJob?.description}
              </p>
            </div>
          </div>

          <div className="mt-8 md:mt-0 md:w-1/2 flex justify-center p-4">
            <Carousel
              opts={{
                align: "start",
              }}
              className=""
              setApi={setCarouselImagesApi}
            >
              <CarouselContent className="items-center">
                {activeJob?.images?.map((imageData, index) => {
                  const host = "http://localhost:3000";
                  const fullImageUrl = `${host}${imageData?.image?.url}`;

                  return (
                    <CarouselItem key={index} className="flex justify-center">
                      <Card className="">
                        <CardContent className="p-5 bg-gray-900">
                          {!imageLoaded && <p> Loading... </p>}
                          <img
                            src={fullImageUrl}
                            alt={`Job Image ${index + 1}`}
                            className={`w-auto h-auto max-h-full max-w-full object-cover rounded-lg ${imageLoaded ? 'block' : 'hidden'}`}
                            onLoad={() => setImageLoaded(true)}
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