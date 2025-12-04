import { Plus } from "lucide-react";
import TextInput from "./TextInput";
import CheckboxGroup from "./CheckboxGroup";
import RemoveButton from "../buttons/RemoveButton";

interface Props {
  options: string[];
  correctAnswers: string[];
  onOptionsChange: (newOptions: string[]) => void;
  onCorrectChange: (newCorrect: string[]) => void;
}

export default function CheckboxEditor({
  options,
  correctAnswers,
  onOptionsChange,
  onCorrectChange,
}: Props) {
  const handleAddOption = () => {
    onOptionsChange([...options, ""]);
  };

  const handleOptionChange = (index: number, newValue: string) => {
    const newOptions = [...options];
    newOptions[index] = newValue;
    onOptionsChange(newOptions);
  };

  const handleRemoveOption = (index: number) => {
    const optionToRemove = options[index];
    const newOptions = options.filter((_, i) => i !== index);

    onOptionsChange(newOptions);

    if (correctAnswers.includes(optionToRemove)) {
      onCorrectChange(correctAnswers.filter((ans) => ans !== optionToRemove));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3">
        <label className="text-xs text-gray-400 font-medium uppercase tracking-wider">
          Options List
        </label>

        {options.map((opt, index) => (
          <div key={index} className="flex items-center gap-2 animate-slide-up">
            <div className="flex-1">
              <TextInput
                value={opt}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
              />
            </div>
            <RemoveButton
              onClick={() => handleRemoveOption(index)}
              title="Remove option"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddOption}
          className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg 
                     border border-dashed border-gray-600 text-gray-400 
                     hover:border-(--color-accent) hover:text-(--color-accent) hover:bg-(--color-accent)/5
                     transition-all text-sm font-medium mt-1"
        >
          <Plus className="w-4 h-4" /> Add Option
        </button>
      </div>

      {options.length > 0 && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-xs text-gray-400 mb-3 font-medium">
            Select which options are correct:
          </p>
          <div className="bg-black/20 p-3 rounded-lg border border-white/5">
            <CheckboxGroup
              options={options}
              value={correctAnswers}
              onChange={onCorrectChange}
            />
          </div>
        </div>
      )}
    </div>
  );
}
