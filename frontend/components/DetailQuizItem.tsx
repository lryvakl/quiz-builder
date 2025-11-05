import React from 'react';
import { QuestionPayload } from '@/services/quizzes';
import {ArrowLeft} from "lucide-react";
import {router} from "next/client";

interface Props {
    question: QuestionPayload;
    index: number;
}

export default function DetailQuizItem({ question, index }: Props) {
    return (
        <div className="border border-gray-200 rounded-xl p-5 shadow-sm bg-white">
            <button
                onClick={() => router.push('/quizzes')}
                className="fixed top-6 left-6 z-50 flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-all px-3 py-2"
                title="Back to quizzes"
            >
                <ArrowLeft className="w-10 h-10"/>
            </button>
            <h2 className="font-medium text-gray-800 mb-3">
                {index + 1}. {question.text}
            </h2>

            {question.type === 'BOOLEAN' && (
                <div className="flex gap-4 text-gray-600">
                    <label className="flex items-center gap-1">
                        <input type="radio" disabled/> True
                    </label>
                    <label className="flex items-center gap-1">
                        <input type="radio" disabled/> False
                    </label>
                </div>
            )}

            {question.type === 'INPUT' && (
                <input
                    type="text"
                    disabled
                    placeholder="Short answer..."
                    className="w-full border border-gray-200 rounded-lg p-2 text-gray-500 bg-gray-50"
                />
            )}

            {question.type === 'CHECKBOX' && (
                <ul className="space-y-1 text-gray-600">
                    {Array.isArray(question.options) &&
                        question.options.map((opt: string, i: number) => (
                            <li key={i}>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" disabled/> {opt}
                                </label>
                            </li>
                        ))}
                </ul>
            )}
        </div>
    );
}