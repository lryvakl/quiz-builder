import { InputHTMLAttributes } from "react";

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function AuthInput({
  label,
  className,
  ...props
}: AuthInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium ml-1 text-gray-300">{label}</label>
      <input
        className={`w-full bg-(--color-bg) border border-(--color-border) text-(--color-text) 
                    rounded-xl px-4 py-3 outline-none 
                    focus:border-(--color-accent) focus:ring-1 focus:ring-(--color-accent) 
                    transition-all placeholder-gray-600 ${className || ""}`}
        {...props}
      />
    </div>
  );
}
