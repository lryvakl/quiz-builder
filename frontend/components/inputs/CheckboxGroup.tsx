interface Props {
  options: string[];
  value: string[];
  onChange: (val: string[]) => void;
}

export default function CheckboxGroup({ options, value, onChange }: Props) {
  const handleChange = (option: string, isChecked: boolean) => {
    const currentValues = Array.isArray(value) ? value : [];
    if (isChecked) {
      onChange([...currentValues, option]);
    } else {
      onChange(currentValues.filter((v) => v !== option));
    }
  };

  return (
    <ul className="space-y-3 text-gray-400">
      {options.map((opt, i) => {
        const isChecked = Array.isArray(value) && value.includes(opt);
        return (
          <li key={i}>
            <label className="flex items-center gap-3 cursor-pointer hover:text-white transition group">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => handleChange(opt, e.target.checked)}
                className="w-5 h-5 accent-(--color-accent) bg-transparent"
              />
              <span className={isChecked ? "text-white" : ""}>{opt}</span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}
