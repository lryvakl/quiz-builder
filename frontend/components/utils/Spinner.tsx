import { Loader2 } from "lucide-react";

interface Props {
  className?: string;
}

export default function Spinner({ className = "w-4 h-4" }: Props) {
  return <Loader2 className={`animate-spin ${className}`} />;
}
