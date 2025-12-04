import type { Question } from "../types/types";
import { X, CheckCircle } from "lucide-react";
import TextInput from "@/components/inputs/TextInput";
import BooleanInput from "./inputs/BooleanInput";
import TypeSelector from "./inputs/TypeSelector";
import CheckboxEditor from "./inputs/CheckboxEditor";

interface Props {
  question: Question;
  onRemove: (id: number) => void;
  onUpdate: (id: number, key: keyof Question, value: any) => void;
}

export default function QuestionItem({ question, onRemove, onUpdate }: Props) {
  const { id, text, type, options, correctAnswers } = question;

  return (
    <div
      className="relative glass border border-border rounded-2xl p-6 shadow-md
                 transition-all duration-300 hover:shadow-lg hover:border-accent/40
                 text-gray-200 animate-slide-up"
    >
      <button
        type="button"
        onClick={() => onRemove(id)}
        className="absolute top-3 right-3 text-gray-500 hover:text-red-400
                   hover:scale-110 transition-all duration-200"
        title="Remove question"
      >
        <X className="w-5 h-5" />
      </button>

      <TextInput
        label="Question Text"
        value={text}
        required
        onChange={(e) => onUpdate(id, "text", e.target.value)}
        placeholder="Enter your question..."
        className="mb-5"
      />

      <TypeSelector
        value={type}
        onChange={(val) => onUpdate(id, "type", val)}
      />

      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
        <span className="flex items-center gap-2 text-sm font-semibold mb-4">
          <CheckCircle className="w-4 h-4" />
          {type === "CHECKBOX"
            ? "Configure Options & Answers"
            : "Set Correct Answer"}
        </span>

        {type === "INPUT" && (
          <TextInput
            value={(correctAnswers as string) || ""}
            onChange={(e) => onUpdate(id, "correctAnswers", e.target.value)}
            placeholder="Type the correct answer..."
          />
        )}

        {type === "BOOLEAN" && (
          <BooleanInput
            name={`correct-${id}`}
            value={correctAnswers as boolean | null}
            onChange={(val) => onUpdate(id, "correctAnswers", val)}
          />
        )}

        {type === "CHECKBOX" && (
          <CheckboxEditor
            options={options || []}
            correctAnswers={(correctAnswers as string[]) || []}
            onOptionsChange={(val) => onUpdate(id, "options", val)}
            onCorrectChange={(val) => onUpdate(id, "correctAnswers", val)}
          />
        )}
      </div>
    </div>
  );
}
