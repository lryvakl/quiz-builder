import { Trash2 } from "lucide-react";
import { MouseEvent } from "react";

interface Props {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  title?: string;
}

export default function RemoveButton({
  onClick,
  className,
  title = "Remove",
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-2.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 
                  rounded-xl transition-all duration-200 
                  hover:scale-105 active:scale-95 ${className || ""}`}
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
