import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function TextInput({ label, className, ...props }: Props) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-semibold text-gray-300 tracking-wide">
          {label}
        </label>
      )}
      <input
        className={`w-full bg-transparent border border-border rounded-lg px-4 py-3 
                    text-gray-100 placeholder:text-gray-500 
                    focus:ring-2 focus:ring-(--color-accent) focus:border-(--color-accent) 
                    outline-none transition-all duration-300 ${
                      className || ""
                    }`}
        {...props}
      />
    </div>
  );
}
