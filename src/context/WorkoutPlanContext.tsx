"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useToast } from "./ToastContext";

export type PlanWorkout = {
  id: number;
  name: string;
  image: string;
  duration: number;
  caloriesBurned: number;
  difficulty: string;
  done: boolean;
};

export type SavedWorkout = Omit<PlanWorkout, "done">;

type ContextType = {
  plan: PlanWorkout[];
  saved: SavedWorkout[];
  addToPlan: (w: Omit<PlanWorkout, "done">) => void;
  removeFromPlan: (id: number) => void;
  toggleDone: (id: number) => void;
  isInPlan: (id: number) => boolean;
  saveWorkout: (w: SavedWorkout) => void;
  unsaveWorkout: (id: number) => void;
  isSaved: (id: number) => boolean;
};

const WorkoutPlanContext = createContext<ContextType | null>(null);

export const WorkoutPlanProvider = ({ children }: { children: ReactNode }) => {
  const [plan, setPlan] = useState<PlanWorkout[]>([]);
  const [saved, setSaved] = useState<SavedWorkout[]>([]);
  const [loaded, setLoaded] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const p = localStorage.getItem("workoutPlan");
    const s = localStorage.getItem("savedWorkouts");

    if (p) {
      const parsedPlan = JSON.parse(p) as PlanWorkout[];
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage on mount
      setPlan(parsedPlan);
    }

    if (s) {
      const parsedSaved = JSON.parse(s) as SavedWorkout[];
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage on mount
      setSaved(parsedSaved);
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect -- marks hydration complete before writing effects run
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem("workoutPlan", JSON.stringify(plan));
  }, [plan, loaded]);

  useEffect(() => {
    if (loaded) localStorage.setItem("savedWorkouts", JSON.stringify(saved));
  }, [saved, loaded]);

  const addToPlan = (w: Omit<PlanWorkout, "done">) =>
    setPlan((prev) => (prev.some((x) => x.id === w.id) ? prev : [...prev, { ...w, done: false }]));

  const removeFromPlan = (id: number) => {
    const workout = plan.find((w) => w.id === id);
    setPlan((prev) => prev.filter((w) => w.id !== id));
    if (workout) showToast(`${workout.name} removed from plan`, "info");
  };

  const toggleDone = (id: number) =>
    setPlan((prev) => prev.map((w) => (w.id === id ? { ...w, done: !w.done } : w)));

  const isInPlan = (id: number) => plan.some((w) => w.id === id);

  const saveWorkout = (w: SavedWorkout) =>
    setSaved((prev) => (prev.some((x) => x.id === w.id) ? prev : [...prev, w]));

  const unsaveWorkout = (id: number) => {
    const workout = saved.find((w) => w.id === id);
    setSaved((prev) => prev.filter((w) => w.id !== id));
    if (workout) showToast(`${workout.name} removed from saved`, "info");
  };

  const isSaved = (id: number) => saved.some((w) => w.id === id);

  return (
    <WorkoutPlanContext.Provider
      value={{ plan, saved, addToPlan, removeFromPlan, toggleDone, isInPlan, saveWorkout, unsaveWorkout, isSaved }}
    >
      {children}
    </WorkoutPlanContext.Provider>
  );
};

export const useWorkoutPlan = () => {
  const ctx = useContext(WorkoutPlanContext);
  if (!ctx) throw new Error("useWorkoutPlan must be used inside WorkoutPlanProvider");
  return ctx;
};