
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import fs from "fs/promises";
import path from "path";

type Workout = {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
};

// const getWorkout = async (): Promise<Workout[]> => {
//   const res = await fetch('http://localhost:3000/data.json');
//   const data = await res.json();
//   return data;
// };
// const getWorkout = async (): Promise<Workout[]> => {
//   const res = await fetch('/data.json');
//   const data = await res.json();
//   return data;
// };
const getWorkout = async (): Promise<Workout[]> => {
  const filePath = path.join(process.cwd(), "public", "data.json");

  const file = await fs.readFile(filePath, "utf-8");

  return JSON.parse(file);
};
const WorkoutLibrary = async () => {
  const workData = await getWorkout();

  return (
    <section className="bg-slate-950 py-16">
      <div className="container mx-auto px-4">

        {/* Heading */}
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Workout Library
          </p>

          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Find Your Perfect Workout
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-slate-400">
            Explore effective workouts designed to help you build strength,
            improve fitness and reach your goals.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workData.map((work) => (
            <div
              key={work.id}
              className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg transition duration-300 hover:-translate-y-2 hover:border-cyan-500/50 hover:shadow-cyan-500/10"
            >
              {/* Image */}
              <div className="relative h-100 overflow-hidden ">
                <Image
                  src={work.image}
                  alt={work.name}
                  width={600}
                  height={400}
                //   className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                //    className="object-cover transition-transform duration-500 group-hover:scale-105"
                className="w-full h-auto object-contain transition duration-500 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

                {/* Difficulty */}
                <span className="absolute right-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                  {work.difficulty}
                </span>

                {/* Rating */}
                <div className="absolute bottom-4 left-4 flex items-center gap-1 rounded-full bg-black/60 px-3 py-1 text-sm text-white backdrop-blur">
                  <span className="text-yellow-400">★</span>
                  {work.rating}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">

                {/* Muscle Groups */}
                <div className="mb-3 flex flex-wrap gap-2">
                  {work.muscleGroups.map((muscle) => (
                    <span
                      key={muscle}
                      className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-400"
                    >
                      {muscle}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white">
                  {work.name}
                </h3>

                {/* Description */}
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">
                  {work.description}
                </p>

                {/* Workout Info */}
                <div className="mt-5 grid grid-cols-2 gap-3 border-y border-slate-800 py-4">

                  <div>
                    <p className="text-xs text-slate-500">Duration</p>
                    <p className="mt-1 font-semibold text-white">
                      {work.duration} min
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">Calories</p>
                    <p className="mt-1 font-semibold text-white">
                      {work.caloriesBurned} kcal
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">Sets</p>
                    <p className="mt-1 font-semibold text-white">
                      {work.sets}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">Reps</p>
                    <p className="mt-1 font-semibold text-white">
                      {work.reps}
                    </p>
                  </div>

                </div>

                {/* Equipment */}
                <div className="mt-4">
                  <p className="text-xs text-slate-500">Equipment</p>
                  <p className="mt-1 text-sm font-medium text-slate-300">
                    {work.equipment}
                  </p>
                </div>

                {/* Button */}
               <Link href={`/workouts/${work.id}`}>
                <button className="mt-5 w-full rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400">
                  View Workout
                </button>
               </Link>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkoutLibrary;