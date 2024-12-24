import React from 'react';
import { Skeleton } from '@mui/material';

const LoaderProduct = () => {
  // Number of skeletons to display
  const skeletonCount = 8;

  return (
    <div className="py-16">
       <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-br from-[#F9F5F6] via-[#FDCEDF] to-[#A855F7] opacity-50 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      >
        <div
          style={{
            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-br from-[#F2BED1] via-[#F8E8EE] to-[#D946EF] opacity-50 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
        />
      </div>
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
  <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
    All Products
  </h2>


  {/* <h3 className="text-lg font-bold">Total Cost</h3> */}

 
        {/* Total Cost Placeholder */}
        <div className="flex items-center space-x-40 ">
          <h3 className="text-lg font-bold">Total Cost</h3>
          <Skeleton variant="text" width="100px" height={30} className="ml-8" />
        </div>




        {/* Grid layout for skeletons matching the product cards */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-6">
          {Array.from({ length: skeletonCount }).map((_, index) => (
            <div
              key={index}
              className="group bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:shadow-lg hover:scale-105"
            >
              {/* Image Skeleton */}
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-t-lg bg-[#F8E8EE]">
                <Skeleton variant="rectangular" width="100%" height="140px" />
              </div>

              {/* Content Skeleton */}
              <div className="p-4 flex flex-col items-start justify-between gap-2">
                {/* Text Skeletons */}
                <Skeleton variant="text" width="60%" height={20} className="mb-2" />
                <Skeleton variant="text" width="40%" height={20} className="mb-2" />
                <Skeleton variant="text" width="30%" height={20} className="mb-2" />
                <Skeleton variant="text" width="50%" height={20} className="mb-2" />

                {/* Buttons Side by Side */}
                <div className="flex gap-2 mt-4 w-full">
                  <Skeleton
                    variant="rectangular"
                    width="35%"
                    height="36px"
                    className="rounded-md"
                  />
                  <Skeleton
                    variant="rectangular"
                    width="40%"
                    height="36px"
                    className="rounded-md"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoaderProduct;