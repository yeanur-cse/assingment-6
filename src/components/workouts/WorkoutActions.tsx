"use client";

import { useWorkoutPlan } from "@/context/WorkoutPlanContext";
import { useToast } from "@/context/ToastContext";

type Props = {
  workout: {
    id: number;
    name: string;
    image: string;
    duration: number;
    caloriesBurned: number;
    difficulty: string;
  };
};

const WorkoutActions = ({ workout }: Props) => {
  const { addToPlan, removeFromPlan, isInPlan, saveWorkout, unsaveWorkout, isSaved } = useWorkoutPlan();
  const { showToast } = useToast();

  const added = isInPlan(workout.id);
  const savedState = isSaved(workout.id);

  const handlePlanClick = () => {
    if (added) {
      removeFromPlan(workout.id); // toast context থেকে উঠবে
    } else {
      addToPlan(workout);
      showToast(`${workout.name} added to plan`, "success");
    }
  };

  const handleSaveClick = () => {
    if (savedState) {
      unsaveWorkout(workout.id); // toast context থেকে উঠবে
    } else {
      saveWorkout(workout);
      showToast(`${workout.name} saved`, "success");
    }
  };

  return (
    <div className="mt-6 flex gap-3">
      <button
        onClick={handlePlanClick}
        className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
          added ? "bg-slate-800 text-slate-400" : "bg-cyan-500 text-slate-950 hover:bg-cyan-400"
        }`}
      >
        {added ? "Added to Plan" : "Add to Workout Plan"}
      </button>

      <button
        onClick={handleSaveClick}
        className={`rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
          savedState ? "border-cyan-500 text-cyan-400" : "border-slate-700 text-slate-300 hover:border-slate-500"
        }`}
      >
        {savedState ? "Saved" : "Save Workout"}
      </button>
    </div>
  );
};

export default WorkoutActions;