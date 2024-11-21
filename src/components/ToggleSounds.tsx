import { memo } from "react";

interface ToggleSoundsProps {
   allowSound: boolean;
   setAllowSound: React.Dispatch<React.SetStateAction<boolean>>;
}

function ToggleSounds({ allowSound, setAllowSound }: ToggleSoundsProps) {
   return (
      <button onClick={() => setAllowSound((allow) => !allow)} className="btn-sound">
         {allowSound ? "🔈" : "🔇"}
      </button>
   );
}

export default memo(ToggleSounds);
