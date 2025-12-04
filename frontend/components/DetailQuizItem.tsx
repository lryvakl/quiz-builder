import { Question } from "../types/types";
import BooleanInput from "./inputs/BooleanInput";
import TextInput from "./inputs/TextInput";
import CheckboxGroup from "./inputs/CheckboxGroup";

interface Props {
  question: Question;
  value: any;
  onChange: (value: any) => void;
}

export default function DetailQuizItem({ question, value, onChange }: Props) {
  return (
    <div className="w-full flex flex-col items-center">
      <div
        className="glass border border-border rounded-2xl p-6 shadow-md
                   transition-all duration-300 w-full max-w-2xl"
      >
        <h2 className="font-semibold text-xl text-gray-100 mb-6 tracking-wide">
          {question.text}
        </h2>

        {question.type === "BOOLEAN" && (
          <BooleanInput
            name={`question-${question.id}`}
            value={value}
            onChange={onChange}
          />
        )}

        {question.type === "INPUT" && (
          <TextInput
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Type your answer..."
          />
        )}

        {question.type === "CHECKBOX" && question.options && (
          <CheckboxGroup
            options={question.options}
            value={value || []}
            onChange={onChange}
          />
        )}
      </div>
    </div>
  );
}
