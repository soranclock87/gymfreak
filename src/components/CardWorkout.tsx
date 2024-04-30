import React from 'react'
import { Workout } from '../data/dataSource'
import { Link } from 'react-router-dom'

const CardWorkout: React.FC<{ workout: Workout }> = ({ workout }) => {
  return (
    <>
    <Link to={`/workout/${workout.workoutId}`}>
        <article className="rounded-xl bg-white p-4 ring ring-indigo-50 sm:p-6 lg:p-8 mb-4">
          <div className="flex items-start sm:gap-8">
            <div
              className="hidden sm:grid sm:size-20 sm:shrink-0 sm:place-content-center sm:rounded-full "
              aria-hidden="true"
            >
              <div
                className="radial-progress text-orange-400"
                style={{ "--value": workout.progress }}
                role="progressbar"
              >
                {workout.progress}%{" "}
              </div>
            </div>

            <div>
              <strong className="rounded border border-orange-500 bg-orange-500 px-3 py-1.5 text-[10px] font-medium text-white">
                Nuevo
              </strong>

              <h3 className="mt-4 text-lg font-medium sm:text-xl">
                <a href="#" className="hover:underline">
                  {" "}
                 {workout.name}{" "}
                </a>
              </h3>

              <p className="mt-1 text-sm text-gray-700">
              {workout.description}
              </p>
            </div>
          </div>
        </article>
    </Link>
    </>
  )
}

export default CardWorkout
