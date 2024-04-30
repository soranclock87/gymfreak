import React, { useEffect, useState } from "react";
import { Workout, getWorkout } from "../data/dataSource";
import { useParams } from "react-router-dom";

const WorkoutDetail: React.FC = () => {
  const [workout, setWorkout] = useState<Workout | null>(null);

  const { workoutId } = useParams();

  useEffect(() => {
    const foundWorkout = getWorkout("123", workoutId);
    if (foundWorkout) {
      setWorkout(foundWorkout);
    }
  }, [workoutId]);

  //obtener el número de semanas y de días del workout
  const weeks = workout?.exercises.map((exercise) => exercise.weekNumber);
  const weeksSet = new Set(weeks);
  console.log(weeksSet);
  const days = workout?.exercises.map((exercise) => exercise.dayNumber);
  const daysSet = new Set(days);
  console.log(daysSet);
  // Agrupar los ejercicios por semana y día
  const groupedWorkouts = workout?.exercises.reduce((acc, exercise) => {
    if (!acc[exercise.weekNumber]) {
      acc[exercise.weekNumber] = {};
    }
    if (!acc[exercise.weekNumber][exercise.dayNumber]) {
      acc[exercise.weekNumber][exercise.dayNumber] = [];
    }
    acc[exercise.weekNumber][exercise.dayNumber].push(exercise);
    return acc;
  }, {} as Record<number, Record<number, Workout["exercises"]>>);

  console.log(groupedWorkouts);

  return (
    <div>
      <div className="space-y-4 m-14">
        {Object.entries(groupedWorkouts || {}).map(([weekNumber, days]) => (
          <details
            key={weekNumber}
            className="group [&_summary::-webkit-details-marker]:hidden"
            open
          >
            <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-50 p-4 text-gray-900">
              <h2 className="font-medium">{`Semana ${weekNumber}`}</h2>

              <svg
                className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </summary>
            {Object.entries(days).map(([dayNumber, exercises]) => (
              <details
                key={dayNumber}
                className="group [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-orange-100 p-3 mx-5 mt-2 text-gray-900">
                  <h3 className="font-medium">{`Día ${dayNumber}`}</h3>

                  <svg
                    className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <div className="grid grid-cols-1 gap-4 p-4">
                  {exercises.map((exercise) => (
                    <div
                      key={exercise.exerciseId}
                      className="grid grid-cols-1 gap-4 p-4 bg-gray-100 rounded-lg"
                    >
                      <h4 className="font-medium">{exercise.data.name}</h4>
                      <p>{exercise.weekNumber}</p>
                    </div>
                  ))}
                </div>
              </details>
            ))}
          </details>
        ))}
      </div>
    </div>
  );
};

export default WorkoutDetail;
