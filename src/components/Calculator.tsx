import { memo, useEffect, useState } from "react";
import clickSound from "../ClickSound.m4a";

interface CalculatorProps {
   workouts: {
      name: string;
      numExercises: number;
   }[];
   allowSound: boolean;
}

function Calculator({ workouts, allowSound }: CalculatorProps) {
   const [number, setNumber] = useState(workouts.at(0)?.numExercises ?? 0);
   const [sets, setSets] = useState(3);
   const [speed, setSpeed] = useState(90);
   const [durationBreak, setDurationBreak] = useState(5);

   const [duration, setDuration] = useState(0);

   // const playSound = useCallback(
   //    function () {
   //       if (!allowSound) return;
   //       const sound = new Audio(clickSound);
   //       sound.play();
   //    },
   //    [allowSound]
   // );

   useEffect(() => {
      setDuration((number * sets * speed) / 60 + (sets - 1) * durationBreak);
   }, [number, sets, speed, durationBreak]);

   useEffect(() => {
      const playSound = function () {
         if (!allowSound) return;
         const sound = new Audio(clickSound);
         sound.play();
      };

      playSound();
   }, [duration, allowSound]);

   // const duration = (number * sets * speed) / 60 + (sets - 1) * durationBreak;
   const mins = Math.floor(duration);
   const seconds = (duration - mins) * 60;

   function handleInc() {
      setDuration((duration) => Math.floor(duration) + 1);
   }

   function handleDec() {
      setDuration((duration) => (duration > 1 ? Math.ceil(duration) - 1 : 0));
   }

   return (
      <>
         <form>
            <div>
               <label>Type of workout</label>
               <select value={number} onChange={(e) => setNumber(+e.target.value)}>
                  {workouts.map((workout) => (
                     <option key={workout.name} value={workout.numExercises}>
                        {workout.name} ({workout.numExercises} exercises)
                     </option>
                  ))}
               </select>
            </div>
            <div>
               <label>How many sets?</label>
               <input type="range" min="1" max="5" value={sets} onChange={(e) => setSets(Number(e.target.value))} />
               <span>{sets}</span>
            </div>
            <div>
               <label>How fast are you?</label>
               <input
                  type="range"
                  min="30"
                  max="180"
                  step="30"
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
               />
               <span>{speed} sec/exercise</span>
            </div>
            <div>
               <label>Break length</label>
               <input
                  type="range"
                  min="1"
                  max="10"
                  value={durationBreak}
                  onChange={(e) => setDurationBreak(Number(e.target.value))}
               />
               <span>{durationBreak} minutes/break</span>
            </div>
         </form>
         <section>
            <button onClick={handleDec}>–</button>
            <p>
               {mins < 10 && "0"}
               {mins}:{seconds < 10 && "0"}
               {seconds}
            </p>
            <button onClick={handleInc}>+</button>
         </section>
      </>
   );
}

export default memo(Calculator);
