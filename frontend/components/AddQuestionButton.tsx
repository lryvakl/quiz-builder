interface Props {
    onAdd: () => void;
}

export default function AddQuestionButton({ onAdd }: Props) {
    return (
        <button
            type="button"
            onClick={onAdd}
            className="mt-4 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow transition-all duration-200 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
            <span className="text-lg">➕</span>
            Add Question
        </button>
    );
}