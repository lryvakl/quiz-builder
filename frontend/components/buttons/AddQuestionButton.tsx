import { Plus } from "lucide-react";

interface Props {
    onAdd: () => void;
}

export default function AddQuestionButton({ onAdd }: Props) {
    return (
        <button
            type="button"
            onClick={onAdd}
            className="inline-flex items-center justify-center gap-2 px-5 py-3
                 rounded-xl font-medium text-sm text-white
                 bg-accent hover:bg-accent-hover
                 shadow-glow hover:scale-[1.03]
                 transition-all duration-300"
        >
            <Plus className="w-5 h-5" />
        </button>
    );
}