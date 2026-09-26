"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useWorkoutPlan, PlanWorkout } from "@/context/WorkoutPlanContext";

const MyPlanPage = () => {
  const { plan, saved, toggleDone, unsaveWorkout, removeFromPlan } = useWorkoutPlan();
  const [tab, setTab] = useState<"plan" | "saved">("plan");

  const isPlanTab = tab === "plan";
  const activeList = isPlanTab ? plan : saved;
  const totalMinutes = activeList.reduce((sum, w) => sum + w.duration, 0);
  const totalCalories = activeList.reduce((sum, w) => sum + w.caloriesBurned, 0);

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-2xl font-bold text-white">MY PLAN</h1>
        <p className="mt-1 text-sm text-slate-400">
          Look at today&apos;s plan, finish them, track your progress.
        </p>

        <div className="mt-5 grid grid-cols-3 gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div>
            <p className="text-xs text-slate-500">Workouts</p>
            <p className="mt-1 text-xl font-bold text-cyan-400">{activeList.length}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Minutes</p>
            <p className="mt-1 text-xl font-bold text-white">{totalMinutes}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Calories</p>
            <p className="mt-1 text-xl font-bold text-white">{totalCalories}</p>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2">
          <button
            onClick={() => setTab("plan")}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold ${
              isPlanTab ? "bg-cyan-500 text-slate-950" : "bg-slate-900 text-slate-400"
            }`}
          >
            Today&apos;s Plan
          </button>
          <button
            onClick={() => setTab("saved")}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold ${
              !isPlanTab ? "bg-cyan-500 text-slate-950" : "bg-slate-900 text-slate-400"
            }`}
          >
            Saved
          </button>
        </div>

        <div className="mt-5">
          {activeList.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-900 py-16">
              <p className="text-sm font-semibold text-slate-300">Nothing here yet</p>
              <p className="mt-1 text-xs text-slate-500">
                Browse the workout library and add some, it takes seconds!
              </p>
              <Link
                href="/"
                className="mt-4 rounded-full bg-cyan-500 px-5 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-400"
              >
                Go to workouts
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {activeList.map((workout) => (
                <div
                  key={workout.id}
                  className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-4"
                >
                  <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg">
                    <Image src={workout.image} alt={workout.name} fill className="object-cover" />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">{workout.name}</p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {workout.duration} min • {workout.caloriesBurned} kcal
                    </p>
                  </div>

                  <Link
                    href={`/workouts/${workout.id}`}
                    className="text-xs font-semibold text-slate-400 hover:text-white"
                  >
                    View Details
                  </Link>

                  {isPlanTab ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleDone(workout.id)}
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                          (workout as PlanWorkout).done
                            ? "bg-slate-800 text-slate-400"
                            : "bg-cyan-500 text-slate-950 hover:bg-cyan-400"
                        }`}
                      >
                        {(workout as PlanWorkout).done ? "Done" : "Mark as Done"}
                      </button>

                      <button
                        onClick={() => removeFromPlan(workout.id)}
                        aria-label="Remove from plan"
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-700 text-slate-400 hover:border-red-500 hover:text-red-500"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => unsaveWorkout(workout.id)}
                      className="rounded-full border border-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:border-slate-500"
                    >
                      Unsave
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default MyPlanPage;