"use client";

import Image from "next/image";
import Link from "next/link";
import { useWorkoutPlan } from "@/context/WorkoutPlanContext";

const Navbar = () => {
  const { plan, saved } = useWorkoutPlan();

  return (
    <div className="navbar bg-base-300 px-4 lg:px-8">
      {/* Logo */}
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl font-bold">
          <Image src="/logo.png" alt="Fitlog Logo" width={32} height={32} />
          FITLOG
        </a>
      </div>

      {/* Center Menu */}
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal gap-2">
          <li>
            <Link href="/" className="bg-lime-400 text-black rounded-full">
              Workouts
            </Link>
          </li>
          <li>
            <Link href="/my-plan">My Plan</Link>
          </li>
        </ul>
      </div>

      {/* Right Side */}
      <div className="navbar-end">
        <div className="hidden sm:flex items-center gap-4 mr-4">
          <span>
            Plan <span className="badge badge-success badge-xs">{plan.length}</span>
          </span>

          <span>
            Saved <span className="badge badge-outline badge-xs">{saved.length}</span>
          </span>
        </div>

        {/* Mobile */}
        <div className="dropdown dropdown-end md:hidden">
          <button tabIndex={0} className="btn btn-ghost btn-square">
            ☰
          </button>

          <ul
            tabIndex={0}
            className="menu dropdown-content bg-base-200 rounded-box mt-3 w-48 p-2 shadow"
          >
            <li>
              <Link href="/" className="bg-lime-400 text-black">
                Workouts
              </Link>
            </li>
            <li>
              <Link href="/my-plan">My Plan</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;