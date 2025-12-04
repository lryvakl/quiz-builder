import { Question } from "@/types/types";

interface Props {
  value: Question["type"];
  onChange: (value: Question["type"]) => void;
}

export default function TypeSelector({ value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-2 mb-5">
      <label className="text-sm font-semibold text-gray-300 tracking-wide">
        Type
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as Question["type"])}
        className="w-full bg-transparent border border-border rounded-lg px-4 py-3
                   text-gray-200 focus:outline-none focus:ring-2 focus:ring-(--color-accent) focus:border-(--color-accent)
                   transition-all cursor-pointer appearance-none"
      >
        <option value="INPUT" className="bg-[#0d0d0d] text-gray-200">
          Short text answer
        </option>
        <option value="BOOLEAN" className="bg-[#0d0d0d] text-gray-200">
          True / False
        </option>
        <option value="CHECKBOX" className="bg-[#0d0d0d] text-gray-200">
          Multiple choice
        </option>
      </select>
    </div>
  );
}
