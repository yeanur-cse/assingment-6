import Image from 'next/image';
import React from 'react';

const page = () => {
    return (
         <section className="container mx-auto px-4 py-5">
      <div className="rounded-lg bg-base-200 px-6 py-10 sm:px-8 md:px-10 lg:px-12">
        
        <div className="grid items-center gap-8 md:grid-cols-2">

          {/* Content */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-lime-400">
              Workout Library
            </p>

            <h1 className="text-4xl font-black uppercase leading-none sm:text-5xl lg:text-6xl">
              Train With Intent. Log Every Set.
            </h1>

            <p className="mt-5 max-w-lg text-sm leading-6 text-base-content/60">
              {`FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.`}
            </p>

            <button className="btn mt-5 bg-lime-400 text-xs font-bold uppercase text-black hover:bg-lime-300">
              Browse Workouts
            </button>
          </div>

          {/* Image */}
          <div className="flex justify-center md:justify-end">
            <Image
              src="/banner.png"
              alt="Workout"
              width={350}
              height={350}
              className="w-52 sm:w-60 md:w-64 lg:w-72"
            />
          </div>

        </div>
      </div>
    </section>
    );
};

export default page;