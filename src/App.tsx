import { useEffect, useMemo, useState } from "react";
import ToggleSounds from "./components/ToggleSounds";
import Calculator from "./components/Calculator";

// no reactive values in this function, so it placed outside of App component (optimization)
function formatTime(date: Date) {
   return new Intl.DateTimeFormat("en", {
      month: "short",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
   }).format(date);
}

export default function App() {
   const [allowSound, setAllowSound] = useState(true); // reactive value
   const [time, setTime] = useState(formatTime(new Date())); // ex: Nov 24, 11:52:44 PM. reactive value

   const partOfDay = time.slice(-2); // AM or PM. Reactive value bcuz it depends on the "time" state

   const workouts = useMemo(() => {
      return [
         {
            name: "Full-body workout",
            numExercises: partOfDay === "AM" ? 9 : 8,
         },
         {
            name: "Arms + Legs",
            numExercises: 6,
         },
         {
            name: "Arms only",
            numExercises: 3,
         },
         {
            name: "Legs only",
            numExercises: 4,
         },
         {
            name: "Core only",
            numExercises: partOfDay === "AM" ? 5 : 4,
         },
      ];
   }, [partOfDay]); // dependency array needs to include all reactive values

   useEffect(() => {
      const id = setInterval(() => {
         setTime(formatTime(new Date()));
      }, 1000);

      return () => clearInterval(id);
   }, []);

   return (
      <main>
         <h1>Workout timer</h1>
         <time>For your workout on {time}</time>
         <ToggleSounds allowSound={allowSound} setAllowSound={setAllowSound} />
         <Calculator workouts={workouts} allowSound={allowSound} />
      </main>
   );
}
