import React, { useEffect, useState } from "react";
import CardWorkout from "../components/CardWorkout";
import { Workout, getWorkouts } from "../data/dataSource";


const UserDash: React.FC = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  useEffect(() => {
    setWorkouts(getWorkouts("123"));
  }, [workouts]);

  return (
    <div>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-4 lg:gap-8 m-6">
        {/* Parte izquierda User */}
        <div className="h-32 rounded-lg ">
          <article className="rounded-lg border bg-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Días Entrenando</p>

                <p className="text-2xl font-medium text-gray-900">21</p>
              </div>
            </div>
          </article>
        </div>

        {/* Parte derecha User */}
        <div className="h-32 rounded-lg bg-gray-200 lg:col-span-2">

         {workouts?.map((workout) => (
            <CardWorkout key={workout.workoutId} workout={workout} /> 
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDash;
 