
import Image from "next/image";
import WorkoutActions from "@/components/workouts/WorkoutActions";

const WorkoutDetails = async ({ params }: { params: Promise<{ workoutId: string }> }) => {
  const { workoutId } = await params;

   const res = await fetch("http://localhost:3000/data.json");
  
  if (!res.ok) {
    throw new Error("Failed to fetch workout data");
  }

  const workouts = await res.json();

  const workout = workouts.find(
    (item: { id: number }) => item.id === Number(workoutId)
  );

  if (!workout) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <h1 className="text-2xl font-bold text-white">Workout not found</h1>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-xl md:flex-row">

          {/* Left: Image */}
          <div className="relative h-[260px] w-full shrink-0 md:h-auto md:w-[320px]">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 320px"
              className="object-cover"
            />
          </div>

          {/* Right: Content */}
          <div className="flex flex-1 flex-col p-5 md:p-7">

            {/* Title row */}
            <div className="flex items-start justify-between gap-3">
              <h1 className="text-xl font-bold text-white md:text-2xl">
                {workout.name}
              </h1>
              <span className="shrink-0 rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400">
                {workout.difficulty}
              </span>
            </div>

            {/* Description */}
            <p className="mt-2 text-sm leading-6 text-slate-400">
              {workout.description}
            </p>

            {/* Muscle groups */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {workout.muscleGroups.map((muscle: string) => (
                <span
                  key={muscle}
                  className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300"
                >
                  {muscle}
                </span>
              ))}
            </div>

            {/* Compact stats row */}
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 border-y border-slate-800 py-3 text-sm">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500">Duration</span>
                <span className="font-semibold text-white">{workout.duration} min</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500">Calories</span>
                <span className="font-semibold text-white">{workout.caloriesBurned} kcal</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500">Sets</span>
                <span className="font-semibold text-white">{workout.sets}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500">Reps</span>
                <span className="font-semibold text-white">{workout.reps}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500">Ipment</span>
                <span className="font-semibold text-white">{workout.equipment}</span>
              </div>
            </div>

            {/* Instructions - compact */}
            <div className="mt-4">
              <h2 className="text-sm font-bold text-white">How to Perform</h2>
              <div className="mt-2 space-y-2">
                {workout.instructions.map((instruction: string, index: number) => (
                  <div key={index} className="flex gap-2.5 text-sm">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-500 text-[11px] font-bold text-slate-950">
                      {index + 1}
                    </span>
                    <p className="leading-6 text-slate-300">{instruction}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <WorkoutActions
  workout={{
    id: workout.id,
    name: workout.name,
    image: workout.image,
    duration: workout.duration,
    caloriesBurned: workout.caloriesBurned,
    difficulty: workout.difficulty,
  }}
/>
          </div>
        </div>
      </div>
    </main>
  );
};

export default WorkoutDetails;