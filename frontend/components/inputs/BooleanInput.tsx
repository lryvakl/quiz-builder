interface Props {
  name: string;
  value: boolean | null;
  onChange: (val: boolean) => void;
}

export default function BooleanInput({ name, value, onChange }: Props) {
  return (
    <div className="flex gap-6 text-gray-400">
      <label className="flex items-center gap-2 cursor-pointer hover:text-white transition">
        <input
          type="radio"
          name={name}
          checked={value === true}
          onChange={() => onChange(true)}
          className="w-5 h-5 accent-(--color-accent) bg-transparent"
        />
        True
      </label>
      <label className="flex items-center gap-2 cursor-pointer hover:text-white transition">
        <input
          type="radio"
          name={name}
          checked={value === false}
          onChange={() => onChange(false)}
          className="w-5 h-5 accent-(--color-accent) bg-transparent"
        />
        False
      </label>
    </div>
  );
}
